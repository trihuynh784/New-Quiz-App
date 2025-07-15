import { Button, Col, Row } from "antd";
import "./topics.scss";
import { useEffect, useState } from "react";
import { getTopicsList } from "../../services/quizService";
import { Link } from "react-router-dom";

function TopicsPage() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const topicsList = await getTopicsList();
      setTopics(topicsList);
    };
    fetchApi();
  }, []);

  return (
    <>
      {topics && (
        <>
          <div className="container">
            <Row className="topic-row" gutter={[10, 20]}>
              {topics.map((item, index) => (
                <Col className="topic-row-col" md={10} xs={20} key={index}>
                  <div className="topic__item">
                    <div className="topic__item--title">{item.name}</div>
                    <div className="topic__item--desc">
                      <div className="topic__item--desc-quantity">
                        20 câu hỏi
                      </div>
                      <Link to={"/quiz/" + item.id}>
                        <Button shape="round" className="topic__item--desc-btn">
                          Xem
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default TopicsPage;
