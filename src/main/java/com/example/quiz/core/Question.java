package com.example.quiz.core;

import java.util.Arrays;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Question {

    @Valid
    @NotNull
    @JsonProperty
    private String question;

    @NotNull
    @Size(min = 1)
    private String[] answers;

    public Question(String question, String[] answers) {
        this.question = question;
        this.answers = answers;
    }

    @JsonProperty
    public String getQuestion() {
        return question;
    }

    @JsonProperty
    public String[] getAnswers() {
        return Arrays.copyOf(answers, answers.length);
    }
}
