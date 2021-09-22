package com.vsboilerplate;

import android.os.Bundle;

import com.reactnativenavigation.NavigationActivity;
import com.vsboilerplate.modules.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreenTheme);  // here
    super.onCreate(savedInstanceState);
  }
}
