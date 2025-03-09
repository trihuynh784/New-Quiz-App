import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnswers, getQuestionsList } from "../../services/quizService";
import { get } from "../../utils/request";
import { Col, Row } from "antd";
import "./results.scss";

function Results() {
  const params = useParams();
  const [answers, setAnswers] = useState([]);
  const [topic, setTopic] = useState([]);
  const [quantityTrue, setQuantityTrue] = useState(0);
  const [quantityFalse, setQuantityFalse] = useState(0);
  const [quantityQues, setQuantityQues] = useState(0);
  const [percentTrue, setPercentTrue] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      const answersUsers = await getAnswers(params.id);
      const questions = await getQuestionsList(answersUsers[0].topicId);
      const getTopic = await get(`topics?id=${answersUsers[0].topicId}`);
      const result = [];

      for (let i = 0; i < questions.length; i++) {
        result.push({
          ...questions[i],
          ...answersUsers[0].answers[i],
        });
      }

      setTopic(getTopic);
      setAnswers(result);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    if (answers.length > 0) {
      const tolQues = answers.length;
      const tolTrue = answers.filter(item => item.correctAnswer === item.answer).length;
      const tolFalse = tolQues - tolTrue;
      const truePer = (tolTrue / tolQues) * 100;

      setQuantityQues(tolQues);
      setQuantityTrue(tolTrue);
      setQuantityFalse(tolFalse);
      setPercentTrue(truePer);
    }
  }, [answers])
  
  return (
    <>
      <div className="container">
        {answers.length > 0 && (
          <>
            <div className="results__header">
              <h1>Chủ đề {topic[0].name}:</h1>
              <span>Đúng: <strong>{quantityTrue}</strong></span>
              <span> | Sai: <strong>{quantityFalse}</strong></span>
              <span> | Tổng số câu: <strong>{quantityQues}</strong></span>
              <span> | Tỉ lệ đúng: <strong>{percentTrue}%</strong></span>
            </div>
            <Row gutter={[10, 20]} className="results__list">
              <form>
                {answers.map((item, index) => (
                  <Col className="results__item" xs={24} key={index}>
                    <div className="results__item--title">
                      <h6>
                        Câu {index + 1}: {item.question}
                      </h6>
                      {item.correctAnswer == item.answer ? (
                        <span className="results__item--title-true"> Đúng</span>
                      ) : (
                        <span className="results__item--title-false"> Sai</span>
                      )}
                    </div>
                    {item.answers.map((itemAns, indexAns) => {
                      let resultClass = "";
                      let defaultChecked = false;

                      if (indexAns == item.answer) {
                        resultClass += " false";
                        defaultChecked = true;
                      }
                      if (indexAns == item.correctAnswer) {
                        resultClass += " true";
                      }

                      return (
                        <div className="results__item-form" key={indexAns}>
                          <input
                            type="radio"
                            key={indexAns}
                            className={resultClass}
                            id={`quiz-${index}-${indexAns}`}
                            name={item.id}
                            value={itemAns}
                            defaultChecked={defaultChecked}
                            disabled
                          />
                          <label
                            htmlFor={`quiz-${index}-${indexAns}`}
                            className={resultClass}
                          >
                            {itemAns}
                          </label>
                        </div>
                      );
                    })}
                  </Col>
                ))}
                <Link to={`/quiz/${topic[0].id}`} className="btn btn-quiz">
                  Làm lại
                </Link>
              </form>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default Results;
