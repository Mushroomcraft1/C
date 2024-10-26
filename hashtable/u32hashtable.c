#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>
#include <stdbool.h>

struct u32BucketListNode
{
    struct u32BucketListNode *next;
    uint32_t key;
    uint32_t value;
};

struct u32HashTable
{
    struct u32BucketListNode **table;
    uint32_t elements;
    uint32_t size;
};

struct u32HashTable *u32HashTableCreate(uint32_t size)
{
    if (size < 128)
    {
        size = 16384;
    }
    struct u32HashTable *hashTable = malloc(sizeof(struct u32HashTable));
    hashTable->size = size;
    hashTable->elements = 0;
    hashTable->table = calloc(size, sizeof(struct u32BucketListNode));
    while (hashTable->table == NULL)
    {
        hashTable->size >>= 1;
        if (hashTable->size < 128)
        {
            free(hashTable);
            return NULL;
        }
        hashTable->table = calloc(hashTable->size, sizeof(struct u32BucketListNode));
    }
    return hashTable;
}

uint32_t uint32HashFunction(uint32_t x, uint32_t size)
{
    return x % size;
}

void u32HashTableClear(struct u32HashTable *hashTable)
{
    int size = hashTable->size;
    hashTable->elements = 0;
    struct u32BucketListNode **table = hashTable->table;

    for (int i = 0; i < size; ++i)
    {
        struct u32BucketListNode *ptr = table[i];
        while (ptr != NULL)
        {
            struct u32BucketListNode *next = ptr->next;
            free(ptr);
            ptr = next;
        }
        table[i] = NULL;
    }
}

void u32HashTableFree(struct u32HashTable *hashTable)
{
    u32HashTableClear(hashTable);
    free(hashTable->table);
    free(hashTable);
}

uint32_t *u32HashTableKeys(struct u32HashTable *hashTable)
{
    int size = hashTable->size;
    int elements = hashTable->elements;
    uint32_t *keys = calloc(sizeof(uint32_t), elements);
    uint32_t idx = 0;
    struct u32BucketListNode **table = hashTable->table;

    for (int i = 0; i < size; ++i)
    {
        struct u32BucketListNode *ptr = table[i];
        while (ptr != NULL)
        {
            struct u32BucketListNode *next = ptr->next;
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

void u32HashTableSet(struct u32HashTable *hashTable, uint32_t key, uint32_t value)
{
    uint32_t hashedKey = uint32HashFunction(key, hashTable->size);

    struct u32BucketListNode **address = &hashTable->table[hashedKey];
    struct u32BucketListNode *node = *address;
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
    struct u32BucketListNode *newNode = malloc(sizeof(struct u32BucketListNode));
    newNode->key = key;
    newNode->value = value;
    newNode->next = NULL;
    *address = newNode;

    ++hashTable->elements;
}

void u32HashTableRemove(struct u32HashTable *hashTable, uint32_t key)
{
    uint32_t hashedKey = uint32HashFunction(key, hashTable->size);
    struct u32BucketListNode *node = hashTable->table[hashedKey];
    struct u32BucketListNode *prev = NULL;
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

uint32_t u32HashTableGet(struct u32HashTable *hashTable, uint32_t key)
{
    uint32_t hashedKey = uint32HashFunction(key, hashTable->size);
    struct u32BucketListNode *node = hashTable->table[hashedKey];
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