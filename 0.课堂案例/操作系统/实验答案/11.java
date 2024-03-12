package czxt_01;

import java.util.LinkedList;
import java.util.Scanner;

public class H {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = scanner.nextInt();          // 访问次数
        int[] access_sequence = new int[count]; // 访问序列
        for (int i = 0; i < count; i++) access_sequence[i] = scanner.nextInt();
        int page_frame_count = scanner.nextInt();     // 页框数

        int break_count = 0; // 中断次数
        LinkedList<Integer> linkedList = new LinkedList<Integer>();
        for (int i = 0; i < access_sequence.length; i++) {
            int access = access_sequence[i];
            // 如果页框中没有页面就依次加入
            if(linkedList.size() >= page_frame_count && !linkedList.contains(access)) {
                linkedList.removeFirst();
                linkedList.addLast(access);
                break_count++;
            } else {
                if(linkedList.size() < page_frame_count && !linkedList.contains(access)) {
                    linkedList.add(access);
                    break_count++;
                }
            }
        }

        System.out.println(break_count);
    }
}
