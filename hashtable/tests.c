#include "../memorytest.c"
#include <time.h> 
#include "hashtable.c"
#include "u64hashtable.c"
#include "u32hashtable.c"

int32_t main()
{
    struct HashTable *hashTable = HashTableCreate(2 << 18, intCompareFunction, intHashFunction);
    if (hashTable == NULL)
    {
        // Couldn't allocate table
        return 137;
    }

    int tests = 10000000;

    printf("--------------------------\n Generic HashTable Tests:\n--------------------------\n");

    clock_t t;
    t = clock();

    for (int i = 0; i < tests; ++i)
    {
        int *key = malloc(sizeof(int32_t));
        int *value = malloc(sizeof(int32_t));

        *key = i;
        *value = i * 7;

        HashTableSet(hashTable, key, value);
    }

    t = clock() - t;
    double timeTaken = ((double)t) / CLOCKS_PER_SEC;

    printf("Set %i elements in %f seconds\n", tests, timeTaken);
    printf("Successful: %li\n\n", hashTable->elements);

    int notFound = 0;
    int incorrect = 0;
    t = clock();

    for (int i = 0; i < tests; ++i)
    {
        int *key = malloc(sizeof(int32_t));

        *key = i;

        int *value = HashTableGet(hashTable, key);
        free(key);

        if (value == NULL) {
            ++notFound;
        } else if (*value != i * 7) {
            ++incorrect;
        }
    }

    t = clock() - t;
    timeTaken = ((double)t) / CLOCKS_PER_SEC;
    printf("Read %i elements in %f seconds\n", tests, timeTaken);
    printf("Not found: %i, Incorrect: %i\n\n", notFound, incorrect);

    t = clock();
    HashTableFree(hashTable);
    t = clock() - t;
    timeTaken = ((double)t) / CLOCKS_PER_SEC;

    printf("Memory leaks: %i, Cleanup in %f seconds\n", memoryAllocationCounter, timeTaken);

    memoryAllocationCounter = 0;




    struct u64HashTable *u64HashTable = u64HashTableCreate(2 << 18);
    if (hashTable == NULL)
    {
        // Couldn't allocate table
        return 137;
    }

    printf("\n-------------------------\n uint64 HashTable Tests:\n-------------------------\n");

    t = clock();

    for (int i = 0; i < tests; ++i)
    {
        uint64_t key = i;
        uint64_t value = i * 7;

        u64HashTableSet(u64HashTable, key, value);
    }

    t = clock() - t;
    timeTaken = ((double)t) / CLOCKS_PER_SEC;

    printf("Set %i elements in %f seconds\n", tests, timeTaken);
    printf("Successful: %li\n\n", hashTable->elements);

    incorrect = 0;
    t = clock();

    for (int i = 0; i < tests; ++i)
    {
        uint64_t key = i;

        uint64_t value = u64HashTableGet(u64HashTable, key);

        if (value != i * 7) {
            ++incorrect;
        }
    }

    t = clock() - t;
    timeTaken = ((double)t) / CLOCKS_PER_SEC;
    printf("Read %i elements in %f seconds\n", tests, timeTaken);
    printf("Incorrect: %i\n\n", incorrect);

    t = clock();
    u64HashTableFree(u64HashTable);
    t = clock() - t;
    timeTaken = ((double)t) / CLOCKS_PER_SEC;

    printf("Memory leaks: %i, Cleanup in %f seconds\n", memoryAllocationCounter, timeTaken);




    struct u32HashTable *u32HashTable = u32HashTableCreate(2 << 18);
    if (hashTable == NULL)
    {
        // Couldn't allocate table
        return 137;
    }

    printf("\n-------------------------\n uint32 HashTable Tests:\n-------------------------\n");

    t = clock();

    for (int i = 0; i < tests; ++i)
    {
        uint32_t key = i;
        uint32_t value = i * 7;

        u32HashTableSet(u32HashTable, key, value);
    }

    t = clock() - t;
    timeTaken = ((double)t) / CLOCKS_PER_SEC;

    printf("Set %i elements in %f seconds\n", tests, timeTaken);
    printf("Successful: %li\n\n", hashTable->elements);

    incorrect = 0;
    t = clock();

    for (int i = 0; i < tests; ++i)
    {
        uint32_t key = i;

        uint32_t value = u32HashTableGet(u32HashTable, key);

        if (value != i * 7) {
            ++incorrect;
        }
    }

    t = clock() - t;
    timeTaken = ((double)t) / CLOCKS_PER_SEC;
    printf("Read %i elements in %f seconds\n", tests, timeTaken);
    printf("Incorrect: %i\n\n", incorrect);

    t = clock();
    u32HashTableFree(u32HashTable);
    t = clock() - t;
    timeTaken = ((double)t) / CLOCKS_PER_SEC;

    printf("Memory leaks: %i, Cleanup in %f seconds\n", memoryAllocationCounter, timeTaken);

    return 0;
}