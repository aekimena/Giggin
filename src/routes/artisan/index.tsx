import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { NewOrders } from "../../artisanScreens/overView/NewOrders";
import { PendingJobs } from "../../artisanScreens/overView/PendingJobs";
import { CompletedJobs } from "../../artisanScreens/overView/CompletedJobs";
import { OrderDetails } from "../../artisanScreens/overView/OrderDetails";
import { Notifications } from "../../artisanScreens/Notifications";
import { BookingInView } from "../../artisanScreens/bookingScreens/BookingInView";
import { SendInvoice } from "../../artisanScreens/bookingScreens/SendInvoice";
import { ConfirmPayment } from "../../artisanScreens/bookingScreens/ConfirmPayment";
import { ConfirmPaySuccess } from "../../artisanScreens/bookingScreens/Successful";
import { Chats } from "../../artisanScreens/Chats";
import { Gallery } from "../../artisanScreens/bottomTabs/account/Gallery";
import { AddToGallery } from "../../artisanScreens/bottomTabs/account/AddToGallery";
import { Verification } from "../../artisanScreens/bottomTabs/account/Verification";
import { IDVerification } from "../../artisanScreens/bottomTabs/account/IDVerification";
import { IDVerification_2 } from "../../artisanScreens/bottomTabs/account/IDVerification_2";
import { VerifySuccess } from "../../artisanScreens/bottomTabs/account/VerifySuccess";
import { MomoVerification } from "../../artisanScreens/bottomTabs/account/MomoVerification";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/features/UserData";
import { IDVerifyCompany } from "../../artisanScreens/bottomTabs/account/IDVerifyCompany";
import { MomoVerifyCompany } from "../../artisanScreens/bottomTabs/account/MomoVerifyCompany";
import { AccountNotification } from "../../artisanScreens/bottomTabs/account/AccountNotification";
import { HelpCenter } from "../../artisanScreens/bottomTabs/account/HelpCenter";
import { HelpCenter2 } from "../../artisanScreens/bottomTabs/account/HelpCenter2";
import { Wallet } from "../../artisanScreens/bottomTabs/account/Wallet";
import { SeeAllDebts } from "../../artisanScreens/bottomTabs/account/SeeAllDebts";
import { SeeAllEarnings } from "../../artisanScreens/bottomTabs/account/SeeAllEarnings";
import { PaymentInvoice } from "../../artisanScreens/bottomTabs/account/PaymentInvoice";
import { DebtInvoice } from "../../artisanScreens/bottomTabs/account/DebtInvoice";
import { AddScreen } from "../../artisanScreens/bottomTabs/AddScreen";
import { AddScreen2 } from "../../artisanScreens/bottomTabs/AddScreen2";
import { AddScreen3 } from "../../artisanScreens/bottomTabs/AddScreen3";
import { MyServices } from "../../artisanScreens/bottomTabs/account/MyServices/MyServices";
import { ServiceInView } from "../../artisanScreens/bottomTabs/account/MyServices/ServiceInView";

const ArtisanRoute = () => {
  const Stack = createNativeStackNavigator();
  const user: UserDataProps = useSelector(selectUserData);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={BottomTabs} name="BottomTabs" />
      <Stack.Screen component={NewOrders} name="NewOrders" />
      <Stack.Screen component={PendingJobs} name="PendingJobs" />
      <Stack.Screen component={CompletedJobs} name="CompletedJobs" />
      <Stack.Screen component={OrderDetails} name="OrderDetails" />
      <Stack.Screen component={Notifications} name="Notifications" />
      <Stack.Screen component={BookingInView} name="BookingInView" />
      <Stack.Screen component={SendInvoice} name="SendInvoice" />
      <Stack.Screen component={ConfirmPayment} name="ConfirmPayment" />
      <Stack.Screen component={ConfirmPaySuccess} name="Successful" />
      <Stack.Screen component={Chats} name="Chats" />
      <Stack.Screen component={Gallery} name="Gallery" />
      <Stack.Screen component={AddToGallery} name="AddToGallery" />
      <Stack.Screen component={Verification} name="Verification" />
      <Stack.Screen component={VerifySuccess} name="VerifySuccess" />
      {user.artisanType == "individual" && (
        <>
          <Stack.Screen component={IDVerification} name="IdVerification" />
          <Stack.Screen component={IDVerification_2} name="IdVerification_2" />

          <Stack.Screen component={MomoVerification} name="MomoVerification" />
        </>
      )}
      {user.artisanType == "company" && (
        <>
          <Stack.Screen component={IDVerifyCompany} name="IdVerification" />
          <Stack.Screen component={MomoVerifyCompany} name="MomoVerification" />
        </>
      )}
      <Stack.Screen
        component={AccountNotification}
        name="AccountNotification"
      />
      <Stack.Screen component={HelpCenter} name="HelpCenter" />
      <Stack.Screen component={HelpCenter2} name="HelpCenter2" />
      <Stack.Screen component={Wallet} name="Wallet" />
      <Stack.Screen component={SeeAllDebts} name="SeeAllDebts" />
      <Stack.Screen component={SeeAllEarnings} name="SeeAllEarnings" />
      <Stack.Screen component={PaymentInvoice} name="PaymentInvoice" />
      <Stack.Screen component={DebtInvoice} name="DebtInvoice" />
      <Stack.Screen component={AddScreen} name="AddScreen" />
      <Stack.Screen component={AddScreen2} name="AddScreen2" />
      <Stack.Screen component={AddScreen3} name="AddScreen3" />
      <Stack.Screen component={MyServices} name="MyServices" />
      <Stack.Screen component={ServiceInView} name="ServiceInView" />
    </Stack.Navigator>
  );
};

export default ArtisanRoute;

const styles = StyleSheet.create({});
