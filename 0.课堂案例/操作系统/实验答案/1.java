package czxt_01;

import java.util.Scanner;

public class A {
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
        // 排序线程优先级
        Process t;
        for (int i = 0; i < proArr.length; i++) {
            for (int j = i + 1; j < proArr.length; j++) {
                if (proArr[j].priority > proArr[i].priority) {
                    t = proArr[i];
                    proArr[i] = proArr[j];
                    proArr[j] = t;
                }
            }
        }

        float totalWorkTime = (float) (proArr[0].workTime * 3 + 2 * proArr[1].workTime + proArr[2].workTime) / proArr.length;
        System.out.printf("%.1f", totalWorkTime);
    }
}
