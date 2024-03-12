package czxt_01;

import java.util.Scanner;

public class A_01 {
    public static class Process {
        String thread;      // 线程
        int priority;       // 优先级
        int workTime;       // 工作时间

        public Process(String thread, int priority, int workTime) {
            this.thread = thread;
            this.priority = priority;
            this.workTime = workTime;
        }
    }

    public static void main(String[] args) {
        // 输入线程信息
        Process[] proArr = new Process[3];
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < 3; i++) {
            String thread = scanner.next();
            int priority = scanner.nextInt();
            int workTime = scanner.nextInt();
            proArr[i] = new Process(thread, priority, workTime);
        }

        // 使用快速排序算法排序线程优先级
        quickSort(proArr, 0, proArr.length - 1);

        float totalWorkTime = (float) (proArr[0].workTime * 3 + 2 * proArr[1].workTime + proArr[2].workTime) / proArr.length;
        System.out.printf("%.1f", totalWorkTime);
    }

    public static void quickSort(Process[] proArr, int low, int high) {
        if (low < high) {
            int partitionIndex = partition(proArr, low, high);
            quickSort(proArr, low, partitionIndex - 1);
            quickSort(proArr, partitionIndex + 1, high);
        }
    }

    public static int partition(Process[] proArr, int low, int high) {
        int pivot = proArr[high].priority;
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (proArr[j].priority >= pivot) {
                i++;
                Process temp = proArr[i];
                proArr[i] = proArr[j];
                proArr[j] = temp;
            }
        }
        Process temp = proArr[i + 1];
        proArr[i + 1] = proArr[high];
        proArr[high] = temp;
        return i + 1;
    }
}
