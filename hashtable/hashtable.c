#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>
#include <stdbool.h>
#include <string.h>

/*
    Written by Mushroomcraft
    https://github.com/Mushroomcraft1/C/blob/main/hashtable/hashtable.c
*/

struct BucketListNode
{
    struct BucketListNode *next;
    void *key;
    void *value;
};

struct HashTable
{
    struct BucketListNode **table;
    uint32_t (*hashFunction)(void *);
    bool (*compareFunction)(void *, void *);
    size_t elements;
    size_t size;
};

struct HashTable *HashTableCreate(size_t size, bool compareFunction(void *, void *), uint32_t hashFunction(void *))
{
    if (size < 128)
    {
        size = 16384;
    }
    struct HashTable *hashTable = malloc(sizeof(struct HashTable));
    hashTable->size = size;
    hashTable->elements = 0;
    hashTable->table = calloc(size, sizeof(struct BucketListNode));
    while (hashTable->table == NULL)
    {
        hashTable->size >>= 1;
        if (hashTable->size < 128)
        {
            free(hashTable);
            return NULL;
        }
        hashTable->table = calloc(hashTable->size, sizeof(struct BucketListNode));
    }
    hashTable->hashFunction = hashFunction;
    hashTable->compareFunction = compareFunction;
    return hashTable;
}

void HashTableFreeListNode(struct BucketListNode *node)
{
    free(node->key);
    free(node->value);
    free(node);
}

void HashTableClear(struct HashTable *hashTable)
{
    int size = hashTable->size;
    hashTable->elements = 0;
    struct BucketListNode **table = hashTable->table;

    for (int i = 0; i < size; ++i)
    {
        struct BucketListNode *ptr = table[i];
        while (ptr != NULL)
        {
            struct BucketListNode *next = ptr->next;
            HashTableFreeListNode(ptr);
            ptr = next;
        }
        table[i] = NULL;
    }
}

void HashTableFree(struct HashTable *hashTable)
{
    HashTableClear(hashTable);
    free(hashTable->table);
    free(hashTable);
}

void **HashTableKeys(struct HashTable *hashTable)
{
    int size = hashTable->size;
    int elements = hashTable->elements;
    void **keys = calloc(sizeof(void *), elements);
    size_t idx = 0;
    struct BucketListNode **table = hashTable->table;

    for (int i = 0; i < size; ++i)
    {
        struct BucketListNode *ptr = table[i];
        while (ptr != NULL)
        {
            struct BucketListNode *next = ptr->next;
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

void HashTableSet(struct HashTable *hashTable, void *key, void *value)
{
    size_t hashedKey = (size_t)(hashTable->hashFunction(key) % hashTable->size);

    struct BucketListNode **address = &hashTable->table[hashedKey];
    struct BucketListNode *node = *address;
    while (node != NULL)
    {
        if (hashTable->compareFunction(node->key, key))
        {
            free(node->value);
            free(key);
            node->value = value;
            return;
        }
        address = &node->next;
        node = *address;
    }
    struct BucketListNode *newNode = malloc(sizeof(struct BucketListNode));
    newNode->key = key;
    newNode->value = value;
    newNode->next = NULL;
    *address = newNode;

    ++hashTable->elements;
}

void HashTableRemove(struct HashTable *hashTable, void *key)
{
    size_t hashedKey = (size_t)hashTable->hashFunction(key) % hashTable->size;
    struct BucketListNode *node = hashTable->table[hashedKey];
    struct BucketListNode *prev = NULL;
    while (node != NULL)
    {
        if (hashTable->compareFunction(node->key, key))
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
            HashTableFreeListNode(node);
            return;
        }
        prev = node;
        node = node->next;
    }
}

void *HashTableGet(struct HashTable *hashTable, void *key)
{
    size_t hashedKey = (size_t)hashTable->hashFunction(key) % hashTable->size;
    struct BucketListNode *node = hashTable->table[hashedKey];
    while (node != NULL)
    {
        if (hashTable->compareFunction(node->key, key))
        {
            return node->value;
        }
        node = node->next;
    }
    return NULL;
}

bool intCompareFunction(void *a, void *b)
{
    return *(int32_t *)a == *(int32_t *)b;
}

uint32_t intHashFunction(void *x)
{
    return *((uint32_t *)x);
}

bool stringCompareFunction(void *a, void *b)
{
    return strcmp((char const *)a, (char const *)b) == 0;
}

uint32_t stringHashFunction(void *x)
{
    char const *input = (char *)x;
    if (input == NULL)
    {
        return 0;
    }

    uint32_t result = 0x55555555;

    while (*input)
    {
        result ^= *input++;
        result = (result << 5) | (result >> (32 - 5));
    }

    return result;
}