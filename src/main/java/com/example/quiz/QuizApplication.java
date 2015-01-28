package com.example.quiz;

import java.util.HashMap;
import java.util.Map;

import com.bazaarvoice.dropwizard.assets.ConfiguredAssetsBundle;
import com.example.quiz.core.Quiz;
import com.example.quiz.resources.QuizResource;
import com.example.quiz.resources.ScoreResource;
import com.sun.jersey.api.container.filter.LoggingFilter;
import com.sun.jersey.api.core.ResourceConfig;

import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.Application;

public class QuizApplication extends Application<QuizConfiguration> {

    private String[] questions;
    private String[][] choices;
    private Map<Long, Quiz> quizzes;
    private int[][] answers;

    public QuizApplication() {
        quizzes = new HashMap<Long, Quiz>();
        questions = new String[] {"What is the meaning of life?",
                     "What color is the sky?",
                     "Does winter suck?"
        };

        choices = new String[3][];
        choices[0] = new String[] {"No one knows", "apples", "42"};
        choices[1] = new String[] {"green", "purple", "blue", "beige"};
        choices[2] = new String[] {"Yes", "No"};
        quizzes.put(new Long(0), new Quiz(0, questions, choices));

        answers = new int[1][];
        answers[0] = new int[] {2, 2, 0};
    }

    public static void main(String[] args) throws Exception {
        new QuizApplication().run(args);
    }

    @Override
    public void initialize(Bootstrap<QuizConfiguration> bootstrap) {
        bootstrap.addBundle(new ConfiguredAssetsBundle("/assets/", "/quiz/"));
//        bootstrap.addBundle(new ConfiguredAssetsBundle("/assets/*", "/*", null, "all"));
    }

    @Override
    public void run(QuizConfiguration configuration, Environment environment) throws Exception {
        environment.jersey().setUrlPattern("/api/*");
        QuizResource quizResource = new QuizResource(quizzes);
        ScoreResource scoreResource = new ScoreResource(answers[0]);
        //Request/Response Logging
        environment.jersey().property(ResourceConfig.PROPERTY_CONTAINER_REQUEST_FILTERS, LoggingFilter.class.getName());
        environment.jersey().property(ResourceConfig.PROPERTY_CONTAINER_RESPONSE_FILTERS, LoggingFilter.class.getName());
        environment.jersey().register(quizResource);
        environment.jersey().register(scoreResource);

    }

}
