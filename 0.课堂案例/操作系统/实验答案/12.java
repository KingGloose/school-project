package czxt_01;

import java.util.*;

public class I {
    static class Process implements Comparable<Process> {
        String name;
        int memory;
        int runtime;
        int priority;
        boolean isFinsh = false;
        boolean isEnterWork = false;

        public Process(String name, int memory, int runtime, int priority) {
            this.name = name;
            this.memory = memory;
            this.runtime = runtime;
            this.priority = priority;
        }

        public int compareTo(Process o) {
            return o.priority - this.priority;
        }
    }

    public static Process getProcessMin(ArrayList<Process> work_arr) {
        if (work_arr.size() == 1) {
            return work_arr.get(0);
        } else {
            int minIndex = 0;
            for (int i = 1; i < work_arr.size(); i++) {
                if (work_arr.get(i).runtime < work_arr.get(minIndex).runtime) {
                    minIndex = i;
                }
            }
            return work_arr.get(minIndex);
        }
    }

    public static void main(String[] args) {
        int count = 3;

        ArrayList<Process> process_arr = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < count; i++) {
            String name = scanner.next();
            int memory = scanner.nextInt();
            int runtime = scanner.nextInt();
            int priority = scanner.nextInt();
            process_arr.add(new Process(name, memory, runtime, priority));
        }

        int space_memory = 100; // 总内存
        int used_memory = 0;    // 使用的内存
        ArrayList<Process> work_arr = new ArrayList<>(); // 工作区

        Collections.sort(process_arr);

        while (true) {
            // 工作调度
            if (used_memory <= 100) {
                for (int i = 0; i < count; i++) {
                    Process process = process_arr.get(i);

                    if (process.isFinsh || process.isEnterWork) continue;

                    int memory = used_memory + process.memory;
                    if (memory <= 100) {
                        used_memory += process.memory;
                        work_arr.add(process);
                        process.isEnterWork = true;
                    }
                }
            }
            // 进程调度
            Process process = getProcessMin(work_arr);
            process.isFinsh = true;
            used_memory -= process.memory;
            work_arr.remove(process);
            System.out.print(process.name + " ");

            // 查看是否都完成
            boolean isFlag = true;
            for (int i = 0; i < 3; i++) {
                if (!process_arr.get(i).isFinsh) {
                    isFlag = false;
                    break;
                }
            }
            if (isFlag) break;
        }
    }
}
