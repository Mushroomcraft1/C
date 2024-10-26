#define TEST
#include "hashtable.c"

enum command
{
    get = 2862133290,
    set = 2861740074,
    del = 2862166826,
    clr = 2862257386,
    lst = 2862442538,
    exitCmd = 1396244437
};

int32_t main()
{
    struct HashTable *hashTable = HashTableCreate(0, stringCompareFunction, stringHashFunction);
    if (hashTable == NULL)
    {
        // Couldn't allocate table
        return 137;
    }

    char *str = malloc(sizeof(char) * 4096);
    bool running = true;
    printf("base memory allocs: %i\n", memoryAllocationCounter);
    while (running)
    {
        fgets(str, 4096, stdin);
        int length = strlen(str);
        str[length - 1] = '\0';
        char *cmd = strtok(str, " ");
        char *option = strtok(NULL, " ");

        // printf("%u\n", stringHashFunction("lst"));
        switch (stringHashFunction(cmd))
        {
        case get:
            char *val = (char *)HashTableGet(hashTable, option);
            if (val == NULL)
            {
                printf("NULL\n");
            }
            else
            {
                printf("%s\n", val);
            }
            break;
        case set:
            char *setValOpt = strtok(NULL, " ");

            int setValSize = strlen(setValOpt) + 1;
            int keySize = strlen(option) + 1;

            char *setVal = malloc(setValSize * sizeof(char));
            char *key = malloc(keySize * sizeof(char));

            strcpy(setVal, setValOpt);
            strcpy(key, option);

            HashTableSet(hashTable, key, setVal);
            break;
        case del:
            HashTableRemove(hashTable, option);
            break;
        case clr:
            HashTableClear(hashTable);
            break;
        case lst:
            void **keys = HashTableKeys(hashTable);
            for (int i = 0; i < hashTable->elements; ++i)
            {
                char *key = (char *)keys[i];
                if (key == NULL)
                {
                    break;
                }
                printf("%s\n", key);
            }
            free(keys);
            break;
        case exitCmd:
            running = false;
            break;
        default:
            printf("Invalid command.\nMust be one of:\n get <key>\n set <key> <value>\n exit\n");
            break;
        }
        printf("memory allocs: %i\n", memoryAllocationCounter);
    }

    free(str);
    u64HashTableFree(hashTable);
    printf("memory leaks: %i\n", memoryAllocationCounter);
    return 0;
}