import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { comment, local } from "../images/iconsSVG";

import { USER, POSTS } from "./DATA";

const Tabs = createBottomTabNavigator();

const PostsScreen = ({ navigation }) => {
  const [user, setUser] = useState(USER[0]);
  const [posts, setPosts] = useState(POSTS);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <TouchableOpacity
          style={styles.userPhotoBox}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={user.ava} style={styles.userPhoto} />
        </TouchableOpacity>
        <View style={styles.userInfoBox}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userMail}>{user.email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.postBox}>
              <Image source={item.picture} style={styles.myPostImage} />
              <Text style={styles.myPostTitle}>{item.title}</Text>
              <View style={styles.touchWrapper}>
                <TouchableOpacity
                  style={styles.infoBoxComment}
                  onPress={() =>
                    navigation.navigate("Comments", { selectedPost: item.id })
                  }
                >
                  <View>{comment}</View>
                  <Text style={styles.commentText}>{item.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.infoBoxLocal}
                  onPress={() =>
                    navigation.navigate("Map", { selectedPost: item.id })
                  }
                >
                  <View style={styles.localIcon}>{local}</View>

                  <Text style={styles.localText}>{item.localisation}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingLeft: 16,
    //  paddingRight: 11,
    paddingRight: 14,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginBottom: 32,
  },
  userPhotoBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userPhoto: {
    width: "100%",
    height: "100%",
  },
  userName: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 13,
    lineHeight: 15,
  },
  userMail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto_Regular",
    fontSize: 11,
    lineHeight: 13,
  },
  postBox: {
    marginBottom: 32,
  },
  myPostImage: {
    width: "99%",
    //  height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  myPostTitle: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 10,
  },
  touchWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  infoBoxComment: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  infoBoxLocal: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  commentText: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  localIcon: {
    marginRight: 8,
  },
  localText: {
    maxWidth: 255,
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginRight: 10,
  },
});

export default PostsScreen;
