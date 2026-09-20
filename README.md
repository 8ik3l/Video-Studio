# Video Studio

تطبيق تحرير فيديو عربي RTL مبني على Expo + EAS، مستوحى من واجهة التصميم المرفقة.

## التشغيل
`npm install`
`npx expo start`

## Android / EAS
`npx eas build --platform android --profile preview`

المميزات الحالية: اختيار صور وفيديوهات، Timeline، معاينة، مشاريع وحفظ محلي، تأثيرات، موسيقى، شاشة تصدير وإعدادات جودة. التصدير النهائي متعدد الطبقات إلى MP4 يحتاج محرك native مثل FFmpeg داخل Development Build.