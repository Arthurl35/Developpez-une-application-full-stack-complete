package com.openclassrooms.mddapi.utils;
import java.util.regex.Pattern;

public class PasswordValidator {

    /**
     * Checks if the password is valid
     * @param password the password to check
     * @return true if the password is valid, false otherwise
     */
    public static boolean isValid(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }

        //Check lowercase
        if (!containsLowerCase(password)) {
            return false;
        }

        // Check uppercase
        if (!containsUpperCase(password)) {
            return false;
        }

        // Check special character
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
