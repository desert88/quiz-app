package com.example.quiz.core;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Quiz {

    @NotNull
    @JsonProperty
    private final long id;

    @Valid
    @NotNull
    @JsonProperty
    private String[] questions;

    @NotNull
    @Size(min = 1)
    @JsonProperty
    private String[][] choices;

    public Quiz(long id, String[] questions, String[][] choices) {
        this.id = id;
        this.questions = questions;
        this.choices = choices;
    }
}
