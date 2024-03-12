package czxt_01;

import java.util.Scanner;

public class F {
    public static class Process {
        String name;    // 进程名
        int[] needRes;  // 需求资源量
        int[] existRes;    // 存在的资源量
        boolean isFinsh = false;    // 是否已经完成

        public Process(String name, int[] needRes) {
            this.name = name;
            this.needRes = needRes;
        }

        public Process(String name, int[] needRes, int[] existRes) {
            this.name = name;
            this.needRes = needRes;
            this.existRes = existRes;
        }

        // 计算需求量多少 0 A 1 B 2 C
        public int countNeed(int index) {
            return needRes[index] - existRes[index];
        }
    }

    // 数组A与数组B比较，该题中A为需求者，B为供应者
    public static boolean compareAToB(int[] A, int[] B) {
        for (int i = 0; i < A.length; i++) {
            if (A[i] > B[i]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 01 输入系统资源
        int[] systemAssets = new int[3];
        for (int i = 0; i < systemAssets.length; i++) {
            systemAssets[i] = scanner.nextInt();
        }

        // 02 输入进程信息
        Process[] processesArr = new Process[5];
        for (int i = 0; i < 5; i++) {
            int[] needRes = new int[3];
            int[] existRes = new int[3];
            String name = scanner.next();

            for (int j = 0; j < 3; j++) {
                needRes[j] = scanner.nextInt();
            }
            for (int j = 0; j < 3; j++) {
                existRes[j] = scanner.nextInt();
            }

            processesArr[i] = new Process(name, needRes, existRes);
        }

        // 03 计算空闲资源数
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 5; j++) {
                systemAssets[i] -= processesArr[j].existRes[i];
            }
        }

        // 04 打印
        for (int i = 0; i < 3; i++) {
            System.out.print(systemAssets[i] + " ");
        }
        System.out.println();
        for (int i = 0; i < 5; i++) {
            String str = processesArr[i].name + " " + processesArr[i].countNeed(0) + " " + processesArr[i].countNeed(1) + " " + processesArr[i].countNeed(2);
            System.out.println(str);
        }
    }
}
