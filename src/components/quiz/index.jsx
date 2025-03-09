import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsList } from "../../services/quizService";
import { Col, Row } from "antd";
import { get, post } from "../../utils/request";
import { getCookie } from "../../helpers/cookie";
import "./quiz.scss";

function Quiz() {
  const params = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getQuestionsList(params.id);
      const topic = await get(`topics?id=${params.id}`);
      setQuestions(result);
      setTopic(topic);
    };
    fetchApi();
  }, []);

  const handleSubmit = async (values) => {
    values.preventDefault();
    const answersUser = [];

    for (let i = 0; i < values.target.elements.length; i++) {
      if (values.target.elements[i].checked == true) {
        answersUser.push({
          questionsId: parseInt(values.target.elements[i].name),
          answer: parseInt(values.target.elements[i].value),
        });
      }
    }

    const userId = getCookie("id");
    const options = {
      topicId: parseInt(params.id),
      userId: parseInt(userId),
      answers: answersUser,
    };

    const result = await post("answers", options);
    if (result) {
      navigate(`/result/${result.id}`);
    }
  };

  return (
    <div className="container">
      {questions.length > 0 && topic.length > 0 && (
        <>
          <h1>Quiz về chủ đề: {topic[0].name}</h1>
          <Row gutter={[10, 20]} className="quiz__list">
            <form onSubmit={handleSubmit}>
              {questions.map((item, index) => (
                <Col className="quiz__item" xs={20} key={index}>
                  <h2>
                    Câu {index + 1}: {item.question}
                  </h2>
                  {item.answers.map((itemAns, indexAns) => (
                    <div className="quiz__item--answers" key={indexAns}>
                      <input
                        type="radio"
                        key={index}
                        name={item.id}
                        value={indexAns}
                        id={`quiz-${item.id}-${indexAns}`}
                        required
                      />
                      <label htmlFor={`quiz-${item.id}-${indexAns}`}>
                        {itemAns}
                      </label>
                    </div>
                  ))}
                </Col>
              ))}
              <button type="submit" className="btn btn-quiz">
                Nộp bài
              </button>
            </form>
          </Row>
        </>
      )}
    </div>
  );
}

export default Quiz;
