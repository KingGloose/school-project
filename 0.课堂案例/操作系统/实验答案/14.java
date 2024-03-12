package czxt_01;

import java.util.Arrays;
import java.util.Scanner;

/*
 * 15 10
 * 24 38 2 110 43 36 5 11 6 180
 * -1
 *
 * */

public class J {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int start = scanner.nextInt(); // 开始位置
        int count = scanner.nextInt(); // 个数

        int[] indexs = new int[count]; // 序列集
        for (int i = 0; i < count; i++) {
            indexs[i] = scanner.nextInt();
        }
        Arrays.sort(indexs);

        int flag = scanner.nextInt(); // 方向

        int startIndex = 0;
        for (int i = 0; i < count; i++) {
            if (indexs[i] < start && indexs[i + 1] > start) {
                if (flag == 1) startIndex = i + 1;
                if (flag == -1) startIndex = i;
                break;
            }
        }

        int i = startIndex;
        int out = 0;
        while (true) {
            if(flag == 1) {
                System.out.print(indexs[i] + " ");
                i++;
                out++;
                if(i == indexs.length) {
                    if(out == count) break;
                    i = startIndex - 1;
                    flag = -1;
                }
            }

            if(flag == -1) {
                System.out.print(indexs[i] + " ");
                i--;
                out++;
                if(i == -1) {
                    if(out == count) break;
                    i = startIndex + 1;
                    flag = 1;
                }
            }
        }
    }
}
