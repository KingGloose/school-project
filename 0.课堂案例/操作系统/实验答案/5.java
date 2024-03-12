// x = 1 + n    x n
// x = 2 + m    x m  false 相关

// x = 5 + m    x m
// y = x + 1    y x  false 相关

// y = x + 1    y x
// z = x + 1    z x  true  无关

package czxt_01;

import java.util.*;

public class C_01 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String statement1 = scanner.nextLine();
        String statement2 = scanner.nextLine();
        Set<String> variables1 = extractVariables(statement1);
        Set<String> variables2 = extractVariables(statement2);

        if (!isContainsVariable(variables1, variables2)) {
            System.out.println("true");  // 无关性
        } else {
            // 判断是否有依赖关系
            String[] stringArray1 = variables1.toArray(new String[variables1.size()]);
            String[] stringArray2 = variables2.toArray(new String[variables2.size()]);

            if (stringArray1[0].equals(stringArray2[0])) {
                System.out.println("false");
            } else {
                for (int i = 1; i < stringArray2.length; i++) {
                    if (stringArray1[0].equals(stringArray2[i])) {
                        System.out.println("false");
                        break;
                    }
                }
                for (int i = 1; i < stringArray1.length; i++) {
                    if (stringArray2[0].equals(stringArray1[i])) {
                        System.out.println("false");
                        break;
                    }
                }
            }
        }
    }

    // 获取变量集合
    private static Set<String> extractVariables(String statement) {
        Set<String> variables = new LinkedHashSet<>();
        String[] tokens = statement.split("[^a-zA-Z]+");
        for (String token : tokens) if (!token.isEmpty()) variables.add(token);
        return variables;
    }

    // 检查集合A中是否包含集合B中的任何元素
    private static boolean isContainsVariable(Set<String> A, Set<String> B) {
        for (String element : A) {
            if (B.contains(element)) {
                return true;
            }
        }
        return false;
    }
}
