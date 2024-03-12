package czxt_01;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class E {
    public static class Process {
        String thread;      // 线程
        int entreTime;      // 进入时刻
        int workTime;       // 工作时间
        int endTime;        // 结束时间
        int waitTime = 0;       // 作业等待时间
        boolean isFinsh = false;    // 完成状态
        float respondRate = 0;       // 响应比

        public Process(String thread, int entreTime, int workTime) {
            this.thread = thread;
            this.entreTime = entreTime;
            this.workTime = workTime;
        }

        // 计算等待时间
        public void countWaitTime(int systemRunTime) {
            this.waitTime = systemRunTime - this.entreTime;
        }

        // 计算响应比
        public void countRespondRate() {
            this.respondRate = 1 + (float) waitTime / workTime;
        }
    }

    public static Process getProcessMax(Process[] process) {
        int maxIndex = 0;
        for (int i = 1; i < process.length; i++) {
            if (!process[i].isFinsh && process[i].respondRate > process[maxIndex].respondRate) {
                maxIndex = i;
            }
        }
        return process[maxIndex];
    }

    public static void main(String[] args) {
        int inLength = 3;   // 默认为3个进程

        // 01 输入线程信息
        Process[] proArr = new Process[inLength];
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < inLength; i++) {
            String thread = scanner.next();
            int entreTime = scanner.nextInt();
            int workTime = scanner.nextInt();
            proArr[i] = new Process(thread, entreTime, workTime);
        }
        // 02 排序线程进入时刻
        Arrays.sort(proArr, Comparator.comparingInt(p -> p.entreTime));
        // 03 计算
        int systemRunTime = 0;
        boolean isFirst = false;
        while (true) {
            if (!isFirst) {
                systemRunTime = proArr[0].entreTime + proArr[0].workTime;
                proArr[0].isFinsh = true;
                isFirst = true;
                proArr[0].endTime = systemRunTime;
            } else {
                int count = 0;
                for (int j = 0; j < proArr.length; j++) {
                    if (proArr[j].isFinsh || proArr[j].entreTime > systemRunTime) {
                        count++;
                        continue;
                    }
                    proArr[j].countWaitTime(systemRunTime);
                    proArr[j].countRespondRate();
                }

                if (count == proArr.length) {
                    systemRunTime++;
                } else {
                    Process processMax = getProcessMax(proArr);
                    systemRunTime += processMax.workTime;
                    processMax.isFinsh = true;
                    processMax.endTime = systemRunTime;
                }
            }
            // 04 查看是否结束
            boolean isFlag = true;
            for (int i = 0; i < 3; i++) {
                if (!proArr[i].isFinsh) {
                    isFlag = false;
                    break;
                }
            }
            if (isFlag) break;
        }
        // 04 - 线程名排序
        Arrays.sort(proArr, Comparator.comparing(p -> p.thread));
        
        for (int i = 0; i < 3; i++) {
            System.out.print(proArr[i].endTime + " ");
        }
    }
}
