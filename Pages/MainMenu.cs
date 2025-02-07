using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;

namespace AMS.Pages
{
    public static class MainMenu
    {
        private static string GetLocalizedPageName(HttpContext context, string enName, string arName)
        {
            var requestCulture = context?.Features.Get<IRequestCultureFeature>()?.RequestCulture.Culture.Name;
            return requestCulture == "ar-SA" ? arName : enName;
        }

        public static class Admin
        {
            public const string RoleName = "Admin";
        }

        public static class SuperAdmin
        {
            public const string RoleName = "Super Admin";
        }

        public static class Dashboard
        {
            public const string RoleName = "Dashboard";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Dashboard", "لوحة التحكم");
            public const string Path = "/Dashboard/Index";
        }

        public static class UserManagement
        {
            public const string RoleName = "User Management";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "User Management", "إدارة المستخدم");
            public const string Path = "/UserManagement/Index";
        }

        public static class UserInfoFromBrowser
        {
            public const string RoleName = "UserInfo From Browser";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "UserInfo From Browser", "معلومات المستخدم من المتصفح");
            public const string Path = "/UserInfoFromBrowser/Index";
        }

        public static class AuditLogs
        {
            public const string RoleName = "Audit Logs";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Audit Logs", "سجلات التدقيق");
            public const string Path = "/AuditLogs/Index";
        }

        public static class SubscriptionRequest
        {
            public const string RoleName = "Subscription Request";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Subscription Request", "طلب الاشتراك");
            public const string Path = "/SubscriptionRequest/Index";
        }

        public static class UserProfile
        {
            public const string RoleName = "User Profile";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "User Profile", "الملف الشخصي");
            public const string Path = "/UserProfile/Index";
        }

        public static class EmailSetting
        {
            public const string RoleName = "Email Setting";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Email Setting", "إعدادات البريد الإلكتروني");
            public const string Path = "/EmailSetting/Index";
        }

        public static class IdentitySetting
        {
            public const string RoleName = "Identity Setting";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Identity Setting", "إعدادات الهوية");
            public const string Path = "/IdentitySetting/Index";
        }

        public static class LoginHistory
        {
            public const string RoleName = "Login History";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Login History", "سجل تسجيل الدخول");
            public const string Path = "/LoginHistory/Index";
        }

        // **AMS Asset Management**
        public static class Asset
        {
            public const string RoleName = "Asset";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Asset", "الأصول");
            public const string Path = "/Asset/Index";
        }

        public static class AssetHistory
        {
            public const string RoleName = "Asset History";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Asset History", "تاريخ الأصول");
            public const string Path = "/AssetHistory/Index";
        }

        public static class Comment
        {
            public const string RoleName = "Comment";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Comment", "تعليق");
            public const string Path = "/Comment/Index";
        }

        public static class PrintBarcode
        {
            public const string RoleName = "Print Barcode";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Print Barcode", "طباعة الباركود");
            public const string Path = "/Barcode/Index";
        }

        public static class PrintQRcode
        {
            public const string RoleName = "Print QR Code";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Print QR Code", "طباعة رمز الاستجابة السريعة");
            public const string Path = "/QRCode/Index";
        }

        public static class Employee
        {
            public const string RoleName = "Manage Employee";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Manage Employee", "إدارة الموظف");
            public const string Path = "/Employee/Index";
        }

        public static class Designation
        {
            public const string RoleName = "Designation";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Designation", "تسمية وظيفية");
            public const string Path = "/Designation/Index";
        }

        public static class Department
        {
            public const string RoleName = "Department";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Department", "قسم");
            public const string Path = "/Department/Index";
        }

        public static class SubDepartment
        {
            public const string RoleName = "Sub Department";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Sub Department", "القسم الفرعي");
            public const string Path = "/SubDepartment/Index";
        }

        public static class CompanyInfo
        {
            public const string RoleName = "Company Info";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Company Info", "معلومات الشركة");
            public const string Path = "/CompanyInfo/Index";
        }

        public static class AssetInfoReport
        {
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Asset Info", "معلومات الأصول");
            public const string Path = "/AssetInfoReport/Index";
        }

        public static class AssetStatusReport
        {
            public const string RoleName = "Asset Status";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Asset Status", "حالة الأصول");
            public const string Path = "/Report/AssetStatusReport";
        }

        public static class AssetAllocationReport
        {
            public const string RoleName = "Asset Allocation Report";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Asset Allocation", "تخصيص الأصول");
            public const string Path = "/Report/AssetAllocationReport";
        }

        public static class AssetRequest
        {
            public const string RoleName = "Asset Request";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Asset Request", "طلب الأصول");
            public const string Path = "/AssetRequest/Index";
        }

        public static class AssetIssue
        {
            public const string RoleName = "Asset Issue";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Asset Issue", "إصدار الأصول");
            public const string Path = "/AssetIssue/Index";
        }

        public static class SystemRole
        {
            public const string RoleName = "System Role";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "System Role", "دور النظام");
            public const string Path = "/SystemRole/Index";
        }
        public static class AssetStatus
        {
            public const string RoleName = "Asset Status";

            public static string PageName(HttpContext context) =>
                GetLocalizedPageName(context, "Asset Status", "حالة الأصول");

            public const string Path = "/AssetStatus/Index";
        }

        public static class AssetSubCategorie
        {
            public const string RoleName = "Asset Sub Category";

            public static string PageName(HttpContext context) =>
                GetLocalizedPageName(context, "Asset Sub Category", "فئة الأصول الفرعية");

            public const string Path = "/AssetSubCategorie/Index";
        }

        public static class AssetCategorie
        {
            public const string RoleName = "Asset Category";

            public static string PageName(HttpContext context) =>
                GetLocalizedPageName(context, "Asset Category", "فئة الأصول");

            public const string Path = "/AssetCategorie/Index";
        }

        public static class Supplier
        {
            public const string RoleName = "Supplier";
            public static string PageName(HttpContext context) =>
                GetLocalizedPageName(context, "Manage Supplier", "إدارة الموردين");

            public const string Path = "/Supplier/Index";
        }


        public static class ManageUserRoles
        {
            public const string RoleName = "Manage User Roles";
            public static string PageName(HttpContext context) => GetLocalizedPageName(context, "Manage User Roles", "إدارة أدوار المستخدمين");
            public const string Path = "/ManageUserRoles/Index";
        }
    }
}
