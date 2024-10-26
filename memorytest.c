static int memoryAllocationCounter = 0;

#define malloc(size) ({            \
    void *ptr = malloc(size);      \
    if (ptr)                       \
    {                              \
        memoryAllocationCounter++; \
    }                              \
    ptr;                           \
})

#define calloc(asize, bsize) ({       \
    void *ptr = calloc(asize, bsize); \
    if (ptr)                          \
    {                                 \
        memoryAllocationCounter++;    \
    }                                 \
    ptr;                              \
})

#define free(ptr) ({           \
    free(ptr);                 \
    memoryAllocationCounter--; \
})