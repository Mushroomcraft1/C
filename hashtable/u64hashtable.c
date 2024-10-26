#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>
#include <stdbool.h>

/*
    Written by Mushroomcraft
    https://github.com/Mushroomcraft1/C/blob/main/hashtable/u64hashtable.c
*/

struct u64BucketListNode
{
    struct u64BucketListNode *next;
    uint64_t key;
    uint64_t value;
};

struct u64HashTable
{
    struct u64BucketListNode **table;
    uint64_t elements;
    uint64_t size;
};

struct u64HashTable *u64HashTableCreate(uint64_t size)
{
    if (size < 128)
    {
        size = 16384;
    }
    struct u64HashTable *hashTable = malloc(sizeof(struct u64HashTable));
    hashTable->size = size;
    hashTable->elements = 0;
    hashTable->table = calloc(size, sizeof(struct u64BucketListNode));
    while (hashTable->table == NULL)
    {
        hashTable->size >>= 1;
        if (hashTable->size < 128)
        {
            free(hashTable);
            return NULL;
        }
        hashTable->table = calloc(hashTable->size, sizeof(struct u64BucketListNode));
    }
    return hashTable;
}


uint64_t uint64HashFunction(uint64_t x, uint64_t size)
{
    return  x % size;
}

void u64HashTableClear(struct u64HashTable *hashTable)
{
    int size = hashTable->size;
    hashTable->elements = 0;
    struct u64BucketListNode **table = hashTable->table;

    for (int i = 0; i < size; ++i)
    {
        struct u64BucketListNode *ptr = table[i];
        while (ptr != NULL)
        {
            struct u64BucketListNode *next = ptr->next;
            free(ptr);
            ptr = next;
        }
        table[i] = NULL;
    }
}

void u64HashTableFree(struct u64HashTable *hashTable)
{
    u64HashTableClear(hashTable);
    free(hashTable->table);
    free(hashTable);
}

uint64_t *u64HashTableKeys(struct u64HashTable *hashTable)
{
    int size = hashTable->size;
    int elements = hashTable->elements;
    uint64_t *keys = calloc(sizeof(uint64_t), elements);
    uint64_t idx = 0;
    struct u64BucketListNode **table = hashTable->table;

    for (int i = 0; i < size; ++i)
    {
        struct u64BucketListNode *ptr = table[i];
        while (ptr != NULL)
        {
            struct u64BucketListNode *next = ptr->next;
            keys[idx] = ptr->key;

            if (++idx >= elements)
            {
                return keys;
            }
            ptr = next;
        }
    }

    return keys;
}

void u64HashTableSet(struct u64HashTable *hashTable, uint64_t key, uint64_t value)
{
    uint64_t hashedKey = uint64HashFunction(key, hashTable->size);

    struct u64BucketListNode **address = &hashTable->table[hashedKey];
    struct u64BucketListNode *node = *address;
    while (node != NULL)
    {
        if (node->key == key)
        {
            node->value = value;
            return;
        }
        address = &node->next;
        node = *address;
    }
    struct u64BucketListNode *newNode = malloc(sizeof(struct u64BucketListNode));
    newNode->key = key;
    newNode->value = value;
    newNode->next = NULL;
    *address = newNode;

    ++hashTable->elements;
}

void u64HashTableRemove(struct u64HashTable *hashTable, uint64_t key)
{
    uint64_t hashedKey = uint64HashFunction(key, hashTable->size);
    struct u64BucketListNode *node = hashTable->table[hashedKey];
    struct u64BucketListNode *prev = NULL;
    while (node != NULL)
    {
        if (node->key == key)
        {
            if (prev != NULL)
            {
                prev->next = node->next;
            }
            else
            {
                hashTable->table[hashedKey] = node->next;
            }
            --hashTable->elements;
            free(node);
            return;
        }
        prev = node;
        node = node->next;
    }
}

uint64_t u64HashTableGet(struct u64HashTable *hashTable, uint64_t key)
{
    uint64_t hashedKey = uint64HashFunction(key, hashTable->size);
    struct u64BucketListNode *node = hashTable->table[hashedKey];
    while (node != NULL)
    {
        if (node->key == key)
        {
            return node->value;
        }
        node = node->next;
    }
    return -1;
}