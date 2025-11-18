import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { OverviewPagesHeader } from "../../../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../../../utils";
import { useRoute } from "@react-navigation/native";
import { Btn100 } from "../../../../components/Btn100";

export const ServiceInView = () => {
  const route = useRoute<any>();
  const passedData: ArtisanServicesProps = route.params.data;
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <View style={[generalStyles.flexRowBtw]}>
        <OverviewPagesHeader title="Service Details" hideRightComp />
        <View
          style={[
            styles.statusCont,
            {
              backgroundColor:
                passedData.status == "pending"
                  ? "rgba(239, 132, 71, 0.75)"
                  : passedData.status == "approved"
                  ? "rgba(65, 191, 45, 0.75)"
                  : "rgba(208, 53, 49, 0.75)",
            },
          ]}
        >
          <Text
            style={[
              generalStyles.poppins500_fs12,
              { color: "#fff", lineHeight: 18 },
            ]}
          >
            {passedData.status == "pending"
              ? "Pending"
              : passedData.status == "approved"
              ? "Approved"
              : "Rejected"}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Image source={passedData.image} style={styles.image} />
        <View style={{ marginTop: 20, gap: 10 }}>
          <Text
            style={[generalStyles.poppins600_fs16, { color: colors.black }]}
          >
            {passedData.service}
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.black, lineHeight: 28 },
            ]}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            aliquid? Recusandae, provident! Aperiam deleniti reprehenderit earum
            eius provident pariatur sit, dicta consequuntur, quia nemo sint
            harum unde vero at inventore.
          </Text>
        </View>
        <View style={{ gap: 10, marginTop: 20 }}>
          <Text style={styles.headers}>Categories</Text>
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.acentGrey500 },
            ]}
          >
            {passedData.category}
          </Text>
        </View>
        <View style={{ marginTop: 20, gap: 10 }}>
          <Text style={styles.headers}>Features</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {passedData.features.map((item, index) => (
              <View key={index} style={styles.features}>
                <Text
                  style={[
                    generalStyles.poppins500_fs12,
                    { color: colors.primaryRed400 },
                  ]}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20, gap: 10 }}>
          <Text style={styles.headers}>Price Range</Text>
          <Text
            style={[
              generalStyles.poppins500_fs16,
              { color: colors.primaryRed400 },
            ]}
          >
            GHC {passedData.minimumPrice} - {passedData.maximumPrice}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          {passedData.status == "rejected" && (
            <View style={{ gap: 7 }}>
              <Text
                style={[
                  generalStyles.poppins600_fs16,
                  { color: "rgba(202, 9, 0, 1)" },
                ]}
              >
                Rejected Reason
              </Text>
              <Text
                style={[
                  generalStyles.poppins400_fs16,
                  { color: colors.acentGrey500 },
                ]}
              >
                Please choose the correct category
              </Text>
            </View>
          )}
          {passedData.status !== "rejected" && (
            <Btn100
              text="Edit Service"
              bg={colors.primaryRed400}
              pressFunc={null}
              rounded
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headers: {
    ...generalStyles.poppins600_fs16,
    color: colors.black,
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 20,
    marginTop: 20,
  },
  features: {
    borderColor: "rgba(208, 53, 49, 0.09)",
    borderWidth: 0.8,
    backgroundColor: "rgba(208, 53, 49, 0.08)",
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  statusCont: {
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
