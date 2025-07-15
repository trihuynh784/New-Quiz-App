import { useEffect, useRef, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getAnswersUserById, getTopicsList } from "../../services/quizService";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./answers.scss";

function AnswersPage() {
  const [answersUser, setAnswersUser] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const userId = getCookie("id");
      console.log(userId);
      const answersUserById = await getAnswersUserById(userId);
      console.log(answersUserById);
      const topicsList = await getTopicsList();
      let isExist = new Set([]);
      const result = [];

      for (let i = 0; i < answersUserById.length; i++) {
        result.push({
          ...topicsList.find((item) => item.id == answersUserById[i].topicId),
          ...answersUserById[i],
        });
        isExist.add(result[i].name);
      }

      setAnswersUser(result);
      setTopics([...isExist]);
    };
    fetchApi();
  }, []);

  return (
    <div className="container">
      <div className="answers">
        <h1>Lịch sử làm bài: </h1>
        {answersUser.length > 0 && (
          <Row className="answers-row" gutter={[10, 20]}>
            {topics.map((item, index) => (
              <Col className="answers-row-col" md={10} xs={20} key={index}>
                <div className="answers__item">
                  <div className="answers__item--title">{item}</div>
                  {answersUser.map((itemInner, indexItemInner) =>
                    itemInner.name == item ? (
                      <div className="answers__item--log" key={indexItemInner}>
                        <div className="answers__item--log-title">
                          Lần làm thứ: {indexItemInner + 1}
                        </div>
                        <Link to={"/result/" + itemInner.id}>
                          <Button
                            shape="round"
                            className="answers__item--log-btn"
                          >
                            Xem bài giải
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <span key={indexItemInner}></span>
                    )
                  )}
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default AnswersPage;
