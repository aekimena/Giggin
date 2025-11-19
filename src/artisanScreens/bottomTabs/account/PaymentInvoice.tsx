import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../../utils";
import { useRoute } from "@react-navigation/native";
import { Btn100 } from "../../../components/Btn100";
import { ButtonContainer } from "../../../components/ButtonContainer";

const RenderFlexBtw = ({ left, right }) => (
  <View style={[generalStyles.flexRowBtw]}>
    <Text
      style={[generalStyles.poppins500_fs14, { color: colors.acentGrey500 }]}
    >
      {left}
    </Text>
    <Text style={[generalStyles.poppins500_fs14, { color: colors.black }]}>
      {right}
    </Text>
  </View>
);

export const PaymentInvoice = () => {
  const route = useRoute<any>();
  const passedData: ArtisanEarnings = route.params.data;
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <OverviewPagesHeader title="Payment Invoice" hideRightComp />
      {/*  */}
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={[
              styles.header,
              {
                backgroundColor:
                  passedData.status == "awaiting"
                    ? colors.primaryRed50
                    : colors.forestGreen100,
              },
            ]}
          >
            <Text
              style={[
                generalStyles.poppins400_fs14,
                {
                  color:
                    passedData.status == "awaiting"
                      ? colors.primaryRed400
                      : colors.forestGreen600,
                },
              ]}
            >
              {passedData.status == "awaiting" ? "Awaiting" : "Settled"}
            </Text>
          </View>
          <Text
            style={[
              generalStyles.poppins600_fs16,
              { color: colors.black, marginTop: 15 },
            ]}
          >
            INV #97710037
          </Text>
          <View style={styles.clientInfoCont}>
            <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
              <Image
                source={passedData.image}
                style={{ height: 70, width: 90, borderRadius: 10 }}
              />
              <View style={{ gap: 3 }}>
                <Text
                  style={[
                    generalStyles.poppins500_fs12,
                    { color: colors.black },
                  ]}
                >
                  Ordered By
                </Text>
                <Text
                  style={[
                    generalStyles.poppins500_fs14,
                    { color: colors.black },
                  ]}
                >
                  {passedData.firstName} {passedData.lastName}
                </Text>
              </View>
            </View>
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.acentGrey500 },
              ]}
            >
              Due 12/14/2024
            </Text>
          </View>
          <View style={styles.detailsCont}>
            <Text
              style={[generalStyles.poppins500_fs14, { color: colors.black }]}
            >
              Detail Items
            </Text>
            <View style={styles.seperator}></View>
            <View style={{ gap: 15 }}>
              <RenderFlexBtw
                left={passedData.service}
                right={"GHC " + passedData.price}
              />
              <RenderFlexBtw left={"Lorem Ipsum"} right={"GHC " + 100} />
            </View>
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.black, marginTop: 20 },
              ]}
            >
              Payment Details
            </Text>
            <View style={styles.seperator}></View>
            <View style={{ gap: 15 }}>
              <RenderFlexBtw
                left={"Price"}
                right={"GHC " + (passedData.price + 100)}
              />
              <RenderFlexBtw
                left={"Subtotal"}
                right={"GHC " + (passedData.price + 100)}
              />
              <RenderFlexBtw
                left={"Charges"}
                right={"GHC " + (passedData.price + 100) * 0.1}
              />
              <RenderFlexBtw
                left={"Total Amount"}
                right={"GHC " + (passedData.price + 100)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <ButtonContainer>
        <View style={styles.btnCont}>
          <Btn100
            text="Download Invoice"
            bg={colors.primaryRed400}
            pressFunc={null}
            rounded
          />
        </View>
      </ButtonContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailsCont: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
  },
  clientInfoCont: {
    marginTop: 20,
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  seperator: {
    width: "100%",
    borderTopWidth: 2,
    borderColor: colors.acentGrey400,
    borderStyle: "dashed",
    marginVertical: 10,
  },
  header: {
    marginTop: 20,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 15,
  },
});
