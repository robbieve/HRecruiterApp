import React, { Component } from "react";
import { Content, Card, CardItem, Text, Radio } from "native-base";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Col, Row } from "react-native-easy-grid";
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import styles from "../styles";
import _styles from "../styles/TestPage";
import Accordion from "react-native-collapsible/Accordion";
import { COLOR } from "../styles/color";
import PropTypes from "prop-types";
import HTMLView from "react-native-htmlview";

const Questions = props => {
  const { question, solution, handleSubmit } = props;
  return (
    <Content style={{ backgroundColor: "white" }}>
      <CardItem>
        <Content>
          <Accordion
            sections={question.data}
            underlayColor={COLOR.LightGrey}
            renderHeader={questionObj => (
              <Card style={styles.blockView}>
                <CardItem>
                  <Text style={styles.headerText}>
                    {questionObj.group_name}
                  </Text>
                </CardItem>
              </Card>
            )}
            renderContent={questionObj =>
              map(questionObj.questions, (ques, index) => {
                return (
                  <Content key={index} padder>
                    <Text style={{ fontSize: 16 }}>
                      {index + 1}. {ques.question}
                    </Text>
                    {ques.description ? (
                      <View style={_styles.descriptionView}>
                        <HTMLView
                          value={`<p>${ques.description}</p>`}
                          stylesheet={styles_p}
                        />
                      </View>
                    ) : null}
                    {ques.options.length !== 0 ? (
                      <Text style={_styles.optText}>Options : </Text>
                    ) : null}
                    {map(ques.options, (values, index) => {
                      let isSolution =
                        solution[0] != undefined
                          ? findIndex(solution, value => {
                              return value.Q_id == ques._id;
                            })
                          : null;
                      let selected =
                        isSolution != null && isSolution != -1
                          ? solution[isSolution].ans_id == values.opt_id
                            ? true
                            : false
                          : false;
                      return (
                        <Content key={index} style={{ padding: Platform.OS === "ios" ? 7 : 5 }}>
                          <Row>
                            <Col style={{ width: "10%" }}>
                              <Radio
                                style={
                                  Platform.OS === "ios"
                                    ? _styles.radio_ios
                                    : _styles.radio
                                }
                                onPress={() => {
                                  handleSubmit(ques._id, values.opt_id);
                                }}
                                activeOpacity={1}
                                selected={selected}
                              />
                            </Col>
                            <Col>
                              <TouchableOpacity
                                onPress={() => {
                                  handleSubmit(ques._id, values.opt_id);
                                }}
                                activeOpacity={1}
                              >
                                <Text>{values.option}</Text>
                              </TouchableOpacity>
                            </Col>
                          </Row>
                        </Content>
                      );
                    })}
                  </Content>
                );
              })
            }
          />
        </Content>
      </CardItem>
    </Content>
  );
};
const styles_p = StyleSheet.create({
  p: {
    fontSize: 16,
    color: "black",
    opacity: 0.8
  }
});
Questions.propTypes = {
  question: PropTypes.object,
  solution: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired
};
export default Questions;
