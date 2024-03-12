package czxt_01;

import java.util.ArrayList;

public class test {
    public static int findMinPositiveWithPriority(int[] arr, int size) {
        int minPositive = Integer.MAX_VALUE; // 初始化为整数最大值
        int minPositiveIndex = -1;

        for (int i = 0; i < arr.length; i++) {
            int difference = arr[i] - size;

            if (difference > 0 && (difference < minPositive || (difference == minPositive && i < minPositiveIndex))) {
                minPositive = difference;
                minPositiveIndex = i;
            }
        }

        return minPositiveIndex;
    }

    public static void main(String[] args) {
        int[] array = {-8, 5, 2, -2, 5, 2, 1, 1};
        int arraySize = 4;
        int resultIndex = findMinPositiveWithPriority(array, arraySize);

        if (resultIndex != -1) {
            System.out.println("整数 - size 的最小正值的索引是: " + resultIndex);
        } else {
            System.out.println("没有找到满足条件的值。");
        }
    }
}
