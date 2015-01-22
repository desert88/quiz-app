package com.example.quiz.resources;

import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.codahale.metrics.annotation.Timed;
import com.example.quiz.core.Quiz;

@Path("/quiz")
@Produces(MediaType.APPLICATION_JSON)
public class QuizResource {
    private final Map<Long, Quiz> quizzes;

    public QuizResource(Map<Long, Quiz> quizzes) {
        this.quizzes = quizzes;
    }

    @GET
    @Timed
    public Quiz getQuiz(@QueryParam("id") long id) {
        return quizzes.get(id);
    }
}
