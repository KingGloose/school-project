package czxt_01;

import java.util.Scanner;

class C {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String statement1 = scanner.nextLine();
        String statement2 = scanner.nextLine();

        String[] variables1 = statement1.split(":=");
        String[] variables2 = statement2.split(":=");

        String w1 = variables1[0];
        String w2 = variables2[0];

        if (w1.equals(w2)) {
            System.out.println(false);
        } else {
            if (variables2[1].contains(w1) || variables1[1].contains(w2)) {
                System.out.println(false);
            } else {
                System.out.println(true);
            }
        }
    }
}
