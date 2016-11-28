package org.apache.cordova.Notification;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

//For JNI
import android.app.Activity;
import android.os.Bundle;
import android.content.Context;
import android.content.Intent;

import android.app.PendingIntent;
import android.app.TaskStackBuilder;
import android.support.v4.app.NotificationCompat; 
import android.app.NotificationManager;
import android.graphics.Color;
import android.net.Uri;
import android.media.RingtoneManager;

/*
*   [CAUTION] android.support.v4.app.NotificationCompat
*  
*  < build.gradle >
*    
*  dependencies {
*     
*     compile fileTree(dir: 'libs', include: '*.jar')
*     // SUB-PROJECT DEPENDENCIES START
*     debugCompile(project(path: "CordovaLib", configuration: "debug"))
*     releaseCompile(project(path: "CordovaLib", configuration: "release"))
*     // SUB-PROJECT DEPENDENCIES END
*
*     // com.android.support : support-V4
*     compile 'com.android.support:support-v4:+' <-------------- add at here
*  }
*
*/

public class Notification extends CordovaPlugin {

    protected static Activity activity = null;
    protected static Context context = null;
    

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException 
    {

      String title = args.getString(0);            //get parameter
      String text = args.getString(1);

      
      // get a MainActivity
      Notification.activity = super.cordova.getActivity();
      Notification.context = super.cordova.getActivity().getApplicationContext();

      // get icon id
      int icon_launcher = Notification.context.getApplicationInfo().icon;


      if (action.equals("basic_notification"))
      {
            
           this.basic_notification(icon_launcher, title, text, callbackContext);
            
           return true;           
       }
       else{

            return false;
       }
    }

    /*
    *   basic_notification
    *   @param :
    *    - icon_image [String] : icon url
    *    - title [String] : title
    *    - text [String] : inner text       
    */
    private void basic_notification(int icon_image_id, String title, String text, CallbackContext callbackContext)
    {        
        
            final int mId = 9999;   //notification ID
            final long vibration_pattern[] = {200,100,500,500};
                       
            try
            {
                // [+] Create builder
                Uri noti_sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
 
                PendingIntent resultPendingIntent = PendingIntent.getActivity(
                    Notification.activity,
                    0,
                    new Intent(Notification.activity , Notification.activity.getClass()),
                    PendingIntent.FLAG_UPDATE_CURRENT
                );


                NotificationCompat.Builder mBuilder = 
                    new NotificationCompat.Builder(Notification.activity )
                                          .setSmallIcon(icon_image_id) // www/imge/popup.png ref : plugin.xml
                                          .setContentTitle(title)
                                          .setContentText(text)
                                          .setLights(0xff00ffff, 500, 500)
                                          .setSound(noti_sound)
                                          .setAutoCancel(true)
                                          .setVibrate(vibration_pattern);


                mBuilder.setContentIntent(resultPendingIntent);
                
                NotificationManager mNotificationManager = 
                    (NotificationManager) Notification.activity.getSystemService(Context.NOTIFICATION_SERVICE);
                
                mNotificationManager.notify(mId, mBuilder.build());

            }
            catch(Exception ex)
            {
               callbackContext.error(ex.toString());
            }
            finally
            {
                callbackContext.success("Sucess");
            }
            
    }

    public void cancel(CallbackContext callbackContext, int id){

        NotificationManager noti = 
            (NotificationManager) cordova.getActivity()
                                         .getSystemService(Context.NOTIFICATION_SERVICE);
        noti.cancel(id);                                 
    }

    public void cancelAll(CallbackContext callbackContext){

        NotificationManager noti = 
            (NotificationManager) cordova.getActivity()
                                         .getSystemService(Context.NOTIFICATION_SERVICE);
        noti.cancelAll();                
    }
 

}
