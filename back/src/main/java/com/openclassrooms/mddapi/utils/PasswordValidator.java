package com.openclassrooms.mddapi.utils;
import java.util.regex.Pattern;

public class PasswordValidator {

    public static boolean isValid(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }

        //Une min
        if (!containsLowerCase(password)) {
            return false;
        }

        // Une maj
        if (!containsUpperCase(password)) {
            return false;
        }

        // Un caractère spécial
        if (!containsSpecialChar(password)) {
            return false;
        }

        return true;
    }

    private static boolean containsLowerCase(String password) {
        return password.matches(".*[a-z].*");
    }

    private static boolean containsUpperCase(String password) {
        return password.matches(".*[A-Z].*");
    }

    private static boolean containsSpecialChar(String password) {
        Pattern specialCharPattern = Pattern.compile("[^a-zA-Z0-9]");
        return specialCharPattern.matcher(password).find();
    }
}
