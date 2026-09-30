# Remix of Remix of Remix of Teacher's Hub

عايزة منصة المعلمات تقدر ترفع ملفاتها ويكون المدير له كود يقدر يشوف كل المعلمات وملفاتهم لكن كل معلمة متقدرش تشوف التاني 
أريدك أن تعمل كمطور ويب محترف (Full-Stack Developer). أريد إنشاء منصة تعليمية مخصصة للمعلمات لتخزين ومشاركة المشاريع وأوراق العمل المدرسية.

المواصفات والتقنيات المطلوبة:

الاستضافة والخدمات السحابية:

الباك إند (Backend): Cloudflare Workers.

تخزين الملفات (File Storage): Cloudflare R2 Bucket.

قاعدة البيانات (Database): Cloudflare D1 أو Cloudflare KV لتخزين بيانات الملفات والمعلمات.

واجهة المستخدم (Frontend):

تصميم عصري وبسيط ودعم كامل للغة العربية (RTL).

صفحة رئيسية لعرض المشاريع المرفوعة مع إمكانية البحث والفلترة حسب (المادة / الصف).

صفحة رفع ملفات متجاوبة وسهلة الاستخدام.

شروط وقواعد رفع الملفات (Validation & Constraints):

حجم الملف: تحديد الحد الأقصى لحجم الملف الواحد بـ 15 ميجابايت (15MB)، وإظهار تنبيه للمستخدم إذا تجاوز هذا الحجم.

صيغ الملفات المسموحة: PDF, DOCX, PPTX, PNG, JPG.

الروابط: خيار لإضافة "رابط فيديو (يوتيوب/درايف)" بدلاً من رفع الفيديو لتوفير المساحة.

عرض التعليمات: إضافة صندوق نصائح وإرشادات للرفع (مثل الحجم المسموح، تحبيذ صيغة PDF).

المطلوب منك الآن:

كتابة الكود البرمجي المكتمل للـ Cloudflare Worker (مع التعامل مع R2 وقواعد البيانات).

كتابة كود واجهة المستخدم (HTML/CSS/JS) مع تصميم جذاب باللغة العربية.

شرح خطوات الربط والتثبيت بين Workers و R2 خطوة بخطوة.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/71eb7070-1b98-476a-a6db-c3a246b6293a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).



```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
