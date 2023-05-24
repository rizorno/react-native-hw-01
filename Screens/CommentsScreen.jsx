import React, { useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { nanoid } from "nanoid";
import { format, parseISO } from "date-fns";
import { btnSend } from "../images/iconsSVG";

import { USER, POSTS } from "./DATA";
import avaUser from "../images/avaUser.png";

const CommentsScreen = ({ route }) => {
  const [isFocused, setIsFocused] = useState("");
  const [comment, setComment] = useState("");

  const post = POSTS.find((item) => item.id === route.params.selectedPost);

  const [commentsList, setCommentsList] = useState(post["comments_text"]);

  const newId = nanoid();
  const date = new Date().toISOString();
  const newComment = {
    id: newId,
    date: date,
    user_id: USER[0].id,
    user_ava: avaUser,
    user_text: comment,
  };

  onSubmit = () => {
    setCommentsList([...commentsList, newComment]);
    setComment("");
  };

  return (
    //  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.flexList}>
        <FlatList
          data={commentsList}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Image source={post.picture} style={styles.myPostImage} />
          }
          renderItem={({ item }) => {
            return (
              <View
                style={
                  item.user_id == USER[0].id
                    ? styles.postBoxOdd
                    : styles.postBoxEven
                }
              >
                <View style={styles.userAvaBox}>
                  <Image source={item["user_ava"]} style={styles.userAva} />
                </View>
                <View
                  style={
                    item.user_id == USER[0].id
                      ? styles.commentWrapperOdd
                      : styles.commentWrapperEven
                  }
                >
                  <Text style={styles.commentText}>{item["user_text"]}</Text>
                  <Text
                    style={
                      item.user_id !== USER[0].id
                        ? styles.commentDateOdd
                        : styles.commentDateEven
                    }
                  >
                    {format(parseISO(item.date), "dd MMMM yyyy | H:mm")}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <View style={styles.commentInputWrapper}>
          <TextInput
            style={
              isFocused.password === "focus"
                ? styles.inputActive
                : styles.inputDefault
            }
            textAlign={"auto"}
            type="text"
            placeholder="Add comment"
            placeholderTextColor="#BDBDBD"
            maxLength={250}
            numberOfLines={1}
            autoComplete="off"
            keyboardType={
              Platform.OS === "ios" ? "default" : "visible-password"
            }
            value={comment}
            onChangeText={(value) => setComment(value)}
            onSubmitEditing={onSubmit}
          />

          <TouchableOpacity
            name="red"
            style={styles.commentBtnIcon}
            onPress={() => {
              onSubmit();
              Keyboard.dismiss();
            }}
            accessible={false}
          >
            <View>{btnSend}</View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
    //  < /TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 14,
  },
  flexList: {
    flex: 1,
    paddingRight: 20,
  },
  myPostImage: {
    width: "99%",
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 32,
  },
  postBoxEven: {
    flexDirection: "row",
    columnGap: 10,
    marginTop: 24,
    marginRight: 10,
  },
  postBoxOdd: {
    flexDirection: "row-reverse",
    columnGap: 10,
    marginTop: 24,
  },
  userAvaBox: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    overflow: "hidden",
  },
  userAva: {
    width: 28,
    height: 28,
  },
  commentWrapperEven: {
    width: 290,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  commentWrapperOdd: {
    maxWidth: 290,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 8,
    borderTopRightRadius: 0,
  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentDateEven: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 10,
    lineHeight: 12,
    marginLeft: "auto",
  },
  commentDateOdd: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 10,
    lineHeight: 12,
    marginRight: "auto",
  },
  commentInputWrapper: {
    position: "relative",
    marginTop: 32,
  },
  inputActive: {
    height: 50,
    width: "100%",
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 5,
    paddingStart: 16,
    paddingEnd: 65,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  inputDefault: {
    height: 50,
    width: "100%",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 5,
    paddingStart: 16,
    paddingEnd: 65,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  commentBtnIcon: {
    position: "absolute",
    top: "10%",
    right: 8,
  },
});

export default CommentsScreen;
