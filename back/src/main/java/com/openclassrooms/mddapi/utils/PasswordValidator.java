package com.openclassrooms.mddapi.utils;
import java.util.regex.Pattern;

public class PasswordValidator {

    private static final int MIN_LENGTH = 8;

    public static boolean isValid(String password) {
        if (password == null || password.length() < MIN_LENGTH) {
            return false;
        }

        // Vérifier la présence d'au moins un chiffre
        if (!containsDigit(password)) {
            return false;
        }

        // Vérifier la présence d'au moins une lettre minuscule
        if (!containsLowerCase(password)) {
            return false;
        }

        // Vérifier la présence d'au moins une lettre majuscule
        if (!containsUpperCase(password)) {
            return false;
        }

        // Vérifier la présence d'au moins un caractère spécial
        if (!containsSpecialChar(password)) {
            return false;
        }

        return true;
    }

    private static boolean containsDigit(String password) {
        return password.matches(".*\\d.*");
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
