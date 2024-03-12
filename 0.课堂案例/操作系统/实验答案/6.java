package czxt_01;

import java.util.Scanner;


public class D {
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
        // 03 输入请求进程信息
        int[] needRes = new int[3];
        String name = scanner.next();
        for (int i = 0; i < 3; i++) needRes[i] = scanner.nextInt();
        Process requestProcess = new Process(name, needRes);

        // 04 判断 - 是否满足了请求进程需求量
        for (int i = 0; i < processesArr.length; i++) {
            if (processesArr[i].name.equals(requestProcess.name)) {
                Process process = processesArr[i];
                if (!compareAToB(requestProcess.needRes, systemAssets)) {
                    System.out.println("false");
                    return;
                } else {
                    // 如果满足，系统给予
                    for (int j = 0; j < 3; j++) {
                        process.existRes[j] += requestProcess.needRes[j];
                        systemAssets[j] -= requestProcess.needRes[j];
                    }
                }
            }
        }

        // 05 判断 - 是否满足各个进程的需求量
        for (int j = 0; j < 5; j++) {
            for (int i = 0; i < 5; i++) {
                if (!processesArr[i].isFinsh) {
                    if (processesArr[i].countNeed(0) <= systemAssets[0] && processesArr[i].countNeed(1) <= systemAssets[1] && processesArr[i].countNeed(2) <= systemAssets[2]) {
                        processesArr[i].isFinsh = true;
                        systemAssets[0] += processesArr[i].existRes[0];
                        systemAssets[1] += processesArr[i].existRes[1];
                        systemAssets[2] += processesArr[i].existRes[2];
                    }
                }
            }
        }

        for (int i = 0; i < 5; i++) {
            if (!processesArr[i].isFinsh) {
                System.out.println(false);
                return;
            }
        }
        System.out.println(true);
    }
}
