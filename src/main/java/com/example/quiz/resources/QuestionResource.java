package com.example.quiz.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.QueryParam;

import com.codahale.metrics.annotation.Timed;
import com.example.quiz.core.Question;
import com.google.common.base.Optional;

@Path("/question")
@Produces(MediaType.APPLICATION_JSON)
public class QuestionResource {

    private String[] questions;
    private String[][] answers;
    private String[] correctAnswers;

    public QuestionResource(String[] questions, String[][] answers, String[] correctAnswers) {
        this.questions = questions;
        this.answers = answers;
        this.correctAnswers = correctAnswers;
    }

    @GET
    @Timed
    public Question getQuestion(@QueryParam("number") Optional<Integer> number) {
        return new Question(questions[number.or(0)], answers[number.or(0)]);
    }
}
