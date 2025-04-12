"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function MobileAppArchitecture() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">FruitFinder Mobile Architecture</h1>
        <p className="text-muted-foreground">Detailed architecture for the mobile application</p>
      </div>

      <Tabs defaultValue="react-native" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="react-native">React Native Approach</TabsTrigger>
          <TabsTrigger value="pwa">PWA + Capacitor Approach</TabsTrigger>
        </TabsList>

        <TabsContent value="react-native" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>React Native Architecture</CardTitle>
                <CardDescription>Core architecture for the React Native mobile app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mermaid-container">
                  <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                    {`
graph TD;
    UI["UI Layer<br/>(React Native Components)"]
    Navigation["Navigation<br/>(React Navigation)"]
    State["State Management<br/>(React Query + Context)"]
    API["API Layer<br/>(Axios/Fetch)"]
    Storage["Local Storage<br/>(AsyncStorage)"]
    Maps["Maps Integration<br/>(React Native Maps)"]
    Native["Native Features<br/>(Camera, Geolocation, etc.)"]
    
    UI -->|"Uses"| Navigation
    UI -->|"Consumes"| State
    State -->|"Fetches data"| API
    State -->|"Persists data"| Storage
    UI -->|"Renders"| Maps
    UI -->|"Accesses"| Native
                    `}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Structure</CardTitle>
                <CardDescription>Recommended folder structure for React Native app</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                  {`
/src
  /api
    - client.ts         # API client setup
    - trees.ts          # Tree-related API calls
    - auth.ts           # Authentication API calls
  /components
    /ui                 # Reusable UI components
    /trees              # Tree-specific components
    /maps               # Map-related components
  /hooks
    - useAuth.ts        # Authentication hooks
    - useTrees.ts       # Tree data hooks
    - useLocation.ts    # Geolocation hooks
  /navigation
    - AppNavigator.tsx  # Main navigation setup
    - AuthNavigator.tsx # Auth-related navigation
    - MapNavigator.tsx  # Map-related navigation
  /screens
    /auth               # Authentication screens
    /map                # Map screens
    /profile            # User profile screens
    /trees              # Tree detail/submission screens
  /store
    - authContext.tsx   # Authentication context
    - mapContext.tsx    # Map state context
  /types
    - index.ts          # TypeScript type definitions
  /utils
    - geolocation.ts    # Geolocation utilities
    - formatting.ts     # Data formatting utilities
    - storage.ts        # Local storage utilities
  /assets
    /images             # Image assets
    /icons              # Icon assets
                  `}
                </pre>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Key Components</CardTitle>
                <CardDescription>Essential components for the React Native app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">MapScreen</h3>
                      <Badge>Core</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Main map interface showing tree locations</p>
                    <ul className="text-xs space-y-1">
                      <li>• Interactive map with tree markers</li>
                      <li>• Location tracking and centering</li>
                      <li>• Filtering controls</li>
                      <li>• Tree selection handling</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">TreeDetailScreen</h3>
                      <Badge>Core</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Detailed view of a selected tree</p>
                    <ul className="text-xs space-y-1">
                      <li>• Tree information display</li>
                      <li>• Photo gallery</li>
                      <li>• Comments and ratings</li>
                      <li>• Harvest reporting</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">ContributeScreen</h3>
                      <Badge>Core</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Interface for adding new trees</p>
                    <ul className="text-xs space-y-1">
                      <li>• Location selection</li>
                      <li>• Tree information form</li>
                      <li>• Photo capture and upload</li>
                      <li>• Submission confirmation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pwa" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>PWA + Capacitor Architecture</CardTitle>
                <CardDescription>Architecture for the PWA with Capacitor approach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mermaid-container">
                  <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                    {`
graph TD;
    NextJS["Next.js Web App"]
    PWA["Progressive Web App<br/>(Service Worker)"]
    Capacitor["Capacitor Bridge"]
    NativeAPI["Native Device APIs"]
    WebView["Native WebView"]
    AppStore["App Stores<br/>(iOS/Android)"]
    
    NextJS -->|"Enhanced with"| PWA
    PWA -->|"Wrapped by"| Capacitor
    Capacitor -->|"Accesses"| NativeAPI
    Capacitor -->|"Renders in"| WebView
    WebView -->|"Distributed via"| AppStore
                    `}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PWA Implementation</CardTitle>
                <CardDescription>Key components for PWA functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-medium">Service Worker</h3>
                    <p className="text-sm text-muted-foreground mt-1">Enables offline functionality and caching</p>
                    <ul className="mt-2 text-xs space-y-1">
                      <li>• Cache API for storing assets and data</li>
                      <li>• Background sync for offline contributions</li>
                      <li>• Push notifications support</li>
                      <li>• Offline map tile caching</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h3 className="font-medium">Web App Manifest</h3>
                    <p className="text-sm text-muted-foreground mt-1">Defines app metadata for installation</p>
                    <ul className="mt-2 text-xs space-y-1">
                      <li>• App name, icons, and colors</li>
                      <li>• Display mode (standalone)</li>
                      <li>• Orientation preferences</li>
                      <li>• Start URL and scope</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="font-medium">IndexedDB</h3>
                    <p className="text-sm text-muted-foreground mt-1">Client-side storage for offline data</p>
                    <ul className="mt-2 text-xs space-y-1">
                      <li>• Tree data storage</li>
                      <li>• User contributions queue</li>
                      <li>• Offline map data</li>
                      <li>• User preferences</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Capacitor Integration</CardTitle>
                <CardDescription>Native functionality via Capacitor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Geolocation</h3>
                    <p className="text-sm text-muted-foreground mb-2">Native device location services</p>
                    <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
                      {`
import { Geolocation } from '@capacitor/geolocation';

const getCurrentPosition = async () => {
  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true
  });
  
  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    accuracy: position.coords.accuracy
  };
};
                      `}
                    </pre>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Camera</h3>
                    <p className="text-sm text-muted-foreground mb-2">Native camera access for photos</p>
                    <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
                      {`
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  
  return image.webPath;
};
                      `}
                    </pre>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground mb-2">Native push notification support</p>
                    <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
                      {`
import { PushNotifications } from '@capacitor/push-notifications';

const registerNotifications = async () => {
  await PushNotifications.requestPermissions();
  
  await PushNotifications.register();
  
  PushNotifications.addListener('pushNotificationReceived', 
    (notification) => {
      console.log('Notification received', notification);
    }
  );
};
                      `}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

