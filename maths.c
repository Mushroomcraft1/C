#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

int main()
{
    if(8 == sizeof(char*)) {
        printf("Running in 64 bit mode\n");
    } else {
        printf("Running in 32 bit mode\n");
    }
    int loop = true;
    int option = 0;
    while (loop)
    {
        printf("Which opperation would you like to do?\n1) Add\n2) Subtract\n3) Multiply\n4) Divide\n5) Exit\n");
        scanf("%d", &option);
        if (5 < option || 1 > option)
        {
            printf("Invalid option, please select a value between 1 and 5.\n");
            option = 0;
        }
        else
        {
            if (5 == option)
            {
                loop = false;
            }
            else
            {
                printf("Enter the first number: ");
                float a = 0, b = 0, c = 0;
                scanf("%f", &a);
                printf("Enter the second number: ");
                scanf("%f", &b);
                switch (option)
                {
                case 1:
                    c = a + b;
                    break;
                case 2:
                    c = a - b;
                    break;
                case 3:
                    c = a * b;
                    break;
                case 4:
                    c = a / b;
                    break;
                }
                printf("The answer is %f!\n", c);
            }
        }
    }
    return 0;
}