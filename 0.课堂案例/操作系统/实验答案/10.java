package czxt_01;

import java.util.*;

public class G {
    /*
     * TODO: 优化设计部分修改 - 2023.11.4
     *  1、设计一个内存类，该内存类中放置的就是Process类，以及该内存类中存放地址信息
     *  2、额外的全局变量较多 -> 查看Java的设计模式，编程思想
     *  3、各数据类型设计不合理，可以换为LinkArrayList
     * */
    static int MIN_ADDRESS = 0;
    static int MAX_ADDRESS = 1024;

    static List<Process> zoneMemory = new ArrayList();

    // 进程信息
    public static class Process {
        int startAddress;   // 开始地址
        int size;           // 大小
        int endAddress;     // 结束地址

        public Process(int startAddress, int size) {
            this.startAddress = startAddress;
            this.size = size;
            this.endAddress = startAddress + size;
        }

        @Override
        public String toString() {
            return "Process{" +
                    "startAddress=" + startAddress +
                    ", size=" + size +
                    ", endAddress=" + endAddress +
                    '}';
        }
    }

    // BSET算法 - 最佳适应算法
    public static int algorithmZoneBest(int size) {
        // 01 - 初始化时计算空闲资源区域值
        List<int[]> remainingZone = remainingZoneHandler();
        // 02 - 使用BEST算法插入的内存值 - 默认使用FIFO模式
        int minIndex = -1;
        int minValue = Integer.MAX_VALUE;
        for (int i = 0; i < remainingZone.size(); i++) {
            int diffSize = remainingZone.get(i)[1] - size;
            if (diffSize > 0 && (diffSize < minValue || (diffSize == minValue && i < minIndex))) {
                minValue = diffSize;
                minIndex = i;
            }
        }

        if (minIndex == -1) return -1;

        int startAddress = remainingZone.get(minIndex)[0];  // 初始地址
        distributionZone(new Process(startAddress, size));

        return startAddress;
    }

    // NEXT算法 - 下次适应算法
    public static int nextIndex = 0;   // NEXT算法记录上次索引
    public static int algorithmZoneNext(int size) {
        // 01 - 初始化时计算空闲资源区域值
        List<int[]> remainingZone = remainingZoneHandler();
        // 02 - 使用NEXT算法
        boolean isLoop = false; // 判断是否循环过一遍
        int newNextIndex = nextIndex;
        while (true) {
            int diffSize = remainingZone.get(newNextIndex)[1] - size;
            if (diffSize >= 0) {
                int startAddress = remainingZone.get(newNextIndex)[0];  // 初始地址
                distributionZone(new Process(startAddress, size));
                nextIndex = newNextIndex;
                return startAddress;
            }
            if (isLoop && newNextIndex == nextIndex) {
                return -1;
            }
            if (newNextIndex == remainingZone.size() - 1) {
                newNextIndex = 0;
                isLoop = true;
                continue;
            }
            newNextIndex++;
        }
    }

    // WORST算法 - 最差适应分配算法
    public static int algorithmZoneWorst(int size) {
        // 01 - 初始化时计算空闲资源区域值
        List<int[]> remainingZone = remainingZoneHandler();
        // 02 - 使用WORST算法插入的内存值 - 默认使用FIFO模式
        int maxIndex = -1;
        int maxValue = Integer.MIN_VALUE;
        for (int i = 0; i < remainingZone.size(); i++) {
            int diffSize = remainingZone.get(i)[1] - size;
            if (diffSize > 0 && (diffSize > maxValue || (diffSize == maxValue && i < maxIndex))) {
                maxValue = diffSize;
                maxIndex = i;
            }
        }

        if (maxIndex == -1) return -1;  // 如果没找到合适的地址

        int startAddress = remainingZone.get(maxIndex)[0];  // 初始地址
        distributionZone(new Process(startAddress, size));

        return startAddress;
    }

    // 为进程分配内存空间
    public static Boolean distributionZone(Process process) {
        if (zoneMemory.isEmpty()) {
            zoneMemory.add(process);
        } else {
            for (int i = 0; i < zoneMemory.size(); i++) {
                Process existProcess = zoneMemory.get(i); // 存在的进程
                // 判断该进程是否能进入
                if (process.startAddress < existProcess.endAddress && process.endAddress > existProcess.endAddress) {
                    return false;
                }
            }
            zoneMemory.add(process);
            Collections.sort(zoneMemory, (o1, o2) -> Integer.compare(o1.startAddress, o2.startAddress));
        }
        return true;
    }

    // 获取系统内存空间中那些部分没有分配，返回各个区域剩余空间
    public static List remainingZoneHandler() {
        List leisureZone = new ArrayList();
        for (int i = 0; i < zoneMemory.size(); i++) {
            Process existProcess = zoneMemory.get(i);
            // 如果为第一个进程信息
            if (i == 0) {
                if (existProcess.startAddress != 0) {
                    int[] zoneinfo = new int[3];
                    zoneinfo[0] = MIN_ADDRESS;
                    zoneinfo[1] = existProcess.startAddress;
                    zoneinfo[2] = existProcess.startAddress;
                    leisureZone.add(zoneinfo);
                }
            }
            // 如果是中间进程信息
            if (i != zoneMemory.size() - 1) {
                Process nextProcess = zoneMemory.get(i + 1);
                // 如果2个进程内存地址相邻
                if (existProcess.endAddress == nextProcess.startAddress) continue;

                int[] zoneinfo = new int[3];
                zoneinfo[0] = existProcess.endAddress;
                zoneinfo[1] = nextProcess.startAddress - existProcess.endAddress;
                zoneinfo[2] = nextProcess.startAddress;
                leisureZone.add(zoneinfo);
            }
            // 如果为最后一个进程信息
            if (i == zoneMemory.size() - 1) {
                if (MAX_ADDRESS - existProcess.endAddress == 0) continue;

                int[] zoneinfo = new int[3];
                zoneinfo[0] = existProcess.endAddress;
                zoneinfo[1] = MAX_ADDRESS - existProcess.endAddress;
                zoneinfo[2] = MAX_ADDRESS;
                leisureZone.add(zoneinfo);
            }
        }
        return leisureZone;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 01 - 输入 - 占用分区的数量
        int occupyZoneNum = scanner.nextInt();   // 占用分区数量
        // 02 - 输入 - n个进程分区
        Process[] occupyZoneArr = new Process[occupyZoneNum];
        for (int i = 0; i < occupyZoneNum; i++) {
            int startAddress = scanner.nextInt();
            int size = scanner.nextInt();
            occupyZoneArr[i] = new Process(startAddress, size);
            if (!distributionZone(occupyZoneArr[i])) return;
        }
        // 03 - 输入 - 申请内存大小空间
        int[] requestZone = new int[3];
        for (int i = 0; i < 3; i++) {
            requestZone[i] = scanner.nextInt();
        }
        // 04 - 输入 - 选择的分配算法
        String algorithm = scanner.next();

        String[] startAddressArr = new String[3];
        switch (algorithm) {
            case "BEST":
                for (int i = 0; i < requestZone.length; i++) {
                    int startAddress = algorithmZoneBest(requestZone[i]);
                    if (startAddress == -1) {
                        startAddressArr[i] = "false";
                        continue;
                    }
                    startAddressArr[i] = Integer.toString(startAddress);
                }
                break;
            case "NEXT":
                for (int i = 0; i < requestZone.length; i++) {
                    int startAddress = algorithmZoneNext(requestZone[i]);
                    if (startAddress == -1) {
                        startAddressArr[i] = "false";
                        continue;
                    }
                    startAddressArr[i] = Integer.toString(startAddress);
                }
                break;
            case "WORST":
                for (int i = 0; i < requestZone.length; i++) {
                    int startAddress = algorithmZoneWorst(requestZone[i]);
                    if (startAddress == -1) {
                        startAddressArr[i] = "false";
                        continue;
                    }
                    startAddressArr[i] = Integer.toString(startAddress);
                }
                break;
        }

        for (int i = 0; i < startAddressArr.length; i++) {
            System.out.print(startAddressArr[i] + " ");
        }
    }
}
