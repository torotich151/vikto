Build a Kotlin native Android social media app with the EXACT same UI/UX design as pic-to-ai-magic.lovable.app. 

## CORE REQUIREMENTS:

### 1. UI/UX DESIGN
- Clone the visual design, color scheme, typography, spacing, and layout from pic-to-ai-magic.lovable.app
- Modern, clean, minimalist aesthetic with smooth animations
- Bottom navigation bar with: Home, Search/Explore, Create Post, Notifications, Profile
- Stories/Status bar at top of feed
- Instagram/TikTok-style feed with image and video posts
- Dark mode support

### 2. AUTHENTICATION (Supabase Backend - Hidden from UI)
- Phone number signup with OTP verification via Supabase Auth
- Email/password signup alternative
- Forgot password with OTP reset flow
- Biometric login option (fingerprint/face unlock)
- NEVER show Supabase branding, errors, or loading states to user
- All Supabase operations must be wrapped with custom loading spinners and friendly error messages

### 3. LOCAL DATABASE (Room/SQLite) - PRIMARY DATA SOURCE
- Use Room database as the PRIMARY data layer for ALL features
- Local database must handle: Users, Posts, Comments, Likes, Chats, Messages, Notifications, Settings, Profile data
- App must work 100% offline - no blank screens or errors when offline
- Background sync worker that pushes local changes to Supabase when online
- Background sync worker that pulls new data from Supabase when online
- Conflict resolution: local data wins if conflict occurs
- Sync status indicators (subtle, non-intrusive)

### 4. FEATURES - END TO END

#### FEED/HOME:
- Infinite scroll pagination (load from local DB, sync from Supabase)
- Image posts with multi-image carousel support
- Video posts (auto-play on scroll, mute by default)
- Like/Unlike with animation (heart burst)
- Save/Bookmark posts
- Share posts (native Android share sheet)
- Double-tap to like
- Pull-to-refresh (syncs with Supabase in background)

#### POST CREATION:
- Camera capture with filters and editing
- Gallery multi-select (up to 10 images)
- Video recording (up to 60 seconds)
- Caption with hashtag suggestions (@mentions, #hashtags)
- Location tagging
- Privacy settings (Public, Friends, Private)
- Draft saving to local DB

#### CHAT/MESSAGING:
- Real-time messaging UI (WhatsApp/Telegram style)
- Text messages only (NO voice calls, NO video calls, NO audio messages)
- Image sharing in chat
- Emoji reactions to messages
- Message read receipts
- Typing indicators
- Chat search functionality
- Delete message for everyone / delete for me
- End-to-end encryption (local encryption before syncing)

#### COMMENTS:
- Nested/threaded comments
- Like comments
- Reply to specific comments
- Mention users with @
- Comment sorting (Top, Newest)
- Load more comments pagination

#### PROFILE:
- Edit profile: photo, bio, name, username, website, location
- Follow/Unfollow users
- Followers/Following lists
- Profile grid view (posts)
- Profile tagged posts
- Saved posts collection
- Archive posts
- Close Friends list
- Privacy settings (private account, story settings, blocked users)

#### NOTIFICATIONS:
- Push notifications (Firebase Cloud Messaging)
- Notification types: likes, comments, follows, mentions, messages
- Notification settings (mute specific types)
- In-app notification center with real-time updates

#### SEARCH/EXPLORE:
- Search users by username/name
- Search posts by hashtag
- Trending hashtags
- Recommended users to follow
- Category-based content discovery

#### SETTINGS:
- Account settings (change password, change phone, deactivate)
- Privacy and security
- Notifications preferences
- Appearance (theme, font size)
- Data usage and storage
- Help and support
- About app

### 5. ADVANCED FEATURES:
- Stories/Status (24h disappearing content) with text, image, video
- Story viewers list
- Highlights (save stories to profile permanently)
- Live streaming (viewer only, NO broadcaster - just watch live)
- Post scheduling (draft and auto-post later)
- Content moderation (report post/user)
- Block/Unblock users
- Mute/Unmute accounts
- Restricted accounts feature
- Analytics for creators (post insights, follower growth)
- QR code profile sharing
- Deep linking (open app from shared links)
- Widget support (home screen widget for stories)
- App shortcuts (long press launcher icon)

### 6. TECHNICAL ARCHITECTURE:
- Kotlin with Jetpack Compose for UI
- MVVM architecture with Repository pattern
- Room database with TypeConverters for complex data
- Supabase client (supabase-kt) hidden behind abstraction layer
- WorkManager for background sync
- Hilt for dependency injection
- Coil for image loading
- ExoPlayer for video playback
- Firebase for push notifications and analytics
- DataStore for user preferences
- Security: EncryptedSharedPreferences, SQLCipher for local DB encryption

### 7. OFFLINE-FIRST BEHAVIOR:
- Every screen must show cached data immediately
- All user actions (like, comment, post, message) save to local DB first
- Background sync attempts every 15 minutes when online
- Instant sync when app comes to foreground and online
- Retry queue for failed sync operations
- User sees "Syncing..." or "Last synced 2 min ago" subtly
- NEVER show "Supabase connection error" or similar raw errors

### 8. PERFORMANCE:
- 60fps smooth scrolling
- Image lazy loading and caching
- Video preloading optimization
- Shimmer loading placeholders (NEVER show raw loading spinners)
- Fast app launch (under 2 seconds)

Build the complete project structure with all files, build.gradle configurations, and a working prototype.