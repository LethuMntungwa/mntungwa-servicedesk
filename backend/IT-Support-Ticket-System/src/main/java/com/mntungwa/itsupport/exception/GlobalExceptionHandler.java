package com.mntungwa.itsupport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // =========================================================
    // VALIDATION ERRORS
    // =========================================================
    //
    // Handles validation problems such as:
    // - Empty ticket title
    // - Missing priority
    //
    // Returns HTTP 400 Bad Request.
    //

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException exception) {

        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        return errors;
    }


    // =========================================================
    // TICKET NOT FOUND
    // =========================================================
    //
    // Handles requests for tickets that do not exist.
    //
    // Example:
    // GET /tickets/999
    //
    // Returns HTTP 404 Not Found.
    //

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(TicketNotFoundException.class)
    public Map<String, String> handleTicketNotFoundException(
            TicketNotFoundException exception) {

        Map<String, String> error = new HashMap<>();

        error.put(
                "error",
                exception.getMessage()
        );

        return error;
    }


    // =========================================================
    // UNEXPECTED SERVER ERRORS
    // =========================================================
    //
    // Handles unexpected errors that we have not specifically
    // handled above.
    //
    // Returns a simple message instead of exposing technical
    // backend information to the user.
    //

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Map<String, String> handleGeneralException(
            Exception exception) {

        Map<String, String> error = new HashMap<>();

        error.put(
                "error",
                "Something went wrong on the server."
        );

        return error;
    }
}