using AMS.Data;
using AMS.Helpers;
using AMS.Models;
using AMS.Models.AssetAssignedViewModel;
using AMS.Models.AssetViewModel;
using AMS.Models.CommonViewModel;
using AMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace AMS.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class AssetController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ICommon _iCommon;
        private readonly IAssetService _iAssetService;

        public AssetController(ApplicationDbContext context, ICommon iCommon, IAssetService iAssetService)
        {
            _context = context;
            _iCommon = iCommon;
            _iAssetService = iAssetService;
        }

        [Authorize(Roles = Pages.MainMenu.Asset.PageName)]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetDataTabelData()
        {
            try
            {
                var draw = HttpContext.Request.Form["draw"].FirstOrDefault();
                var start = Request.Form["start"].FirstOrDefault();
                var length = Request.Form["length"].FirstOrDefault();

                var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
                var sortColumnAscDesc = Request.Form["order[0][dir]"].FirstOrDefault();
                var searchValue = Request.Form["search[value]"].FirstOrDefault();

                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int resultTotal = 0;

                IQueryable<AssetCRUDViewModel> _GetGridItem = null;
                var _UserEmail = HttpContext.User.Identity.Name;
                var _IsInRole = User.IsInRole("Admin");
                _GetGridItem = _iCommon.GetGridAssetList(_IsInRole);
                if (_IsInRole)
                {
                    _GetGridItem = _iCommon.GetGridAssetList(_IsInRole);
                }
                else
                {
                    var _GetLoginEmployeeId = await _iCommon.GetLoginEmployeeId(_UserEmail);
                    _GetGridItem = _iCommon.GetGridAssetList(_IsInRole).Where(x => x.AssignEmployeeId == _GetLoginEmployeeId);
                }


                //Sorting
                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnAscDesc)))
                {
                    _GetGridItem = _GetGridItem.OrderBy(sortColumn + " " + sortColumnAscDesc);
                }

                //Search
                if (!string.IsNullOrEmpty(searchValue))
                {
                    searchValue = searchValue.ToLower();
                    _GetGridItem = _GetGridItem.Where(obj => obj.Id.ToString().Contains(searchValue)
                    || obj.AssetId.ToLower().Contains(searchValue)
                    || obj.AssetModelNo.ToLower().Contains(searchValue)
                    || obj.Name.ToLower().Contains(searchValue)
                    || obj.UnitPrice.ToString().Contains(searchValue)

                    || obj.DateOfPurchase.ToString().Contains(searchValue));
                }

                resultTotal = _GetGridItem.Count();

                var result = _GetGridItem.Skip(skip).Take(pageSize).ToList();
                return Json(new { draw = draw, recordsFiltered = resultTotal, recordsTotal = resultTotal, data = result });

            }
            catch (Exception)
            {
                throw;
            }

        }
        [HttpGet]
        public async Task<IActionResult> Details(Int64 id)
        {
            var _GetAssetInfo = await GetAssetInfo(id);
            return PartialView("_AllInfo", _GetAssetInfo);
        }
        public async Task<IActionResult> DetailsGeneral(Int64 id)
        {
            var _GetAssetInfo = await _iCommon.GetAssetList().Where(x => x.Id == id).SingleOrDefaultAsync();
            return PartialView("_Details", _GetAssetInfo);
        }
        [HttpGet]
        public async Task<IActionResult> PrintAsset(Int64 id)
        {
            var _GetAssetInfo = await GetAssetInfo(id);
            _GetAssetInfo.CompanyInfoCRUDViewModel = _iCommon.GetCompanyInfo();
            return View(_GetAssetInfo);
        }
        private async Task<AssetCRUDViewModel> GetAssetInfo(Int64 id)
        {
            try
            {
                AssetCRUDViewModel vm = new();
                vm = await _iCommon.GetAssetList().Where(x => x.Id == id).SingleOrDefaultAsync();

                vm.UserProfileCRUDViewModel = await _iCommon.GetUserProfileDetails().Where(x => x.UserProfileId == vm.AssignEmployeeId).SingleOrDefaultAsync();
                vm.listAssetHistoryCRUDViewModel = await _iCommon.GetAssetHistoryList().Where(x => x.AssetId == vm.Id).ToListAsync();
                vm.listCommentCRUDViewModel = await _iCommon.GetCommentList(id).ToListAsync();
                vm.listAssetRequestCRUDViewModel = await _iCommon.GetAssetRequestList(true).Where(m => m.AssetId == id).ToListAsync();
                vm.listAssetIssueCRUDViewModel = await _iCommon.GetAssetIssueList(true).Where(m => m.AssetId == id).ToListAsync();

                AssetAssignedCRUDViewModel _AssetAssignedCRUDViewModel = new();
                _AssetAssignedCRUDViewModel.listAssetAssignedCRUDViewModel = await _iCommon.GetAssetAssignedByAsetId(id).ToListAsync();
                vm.AssetAssignedCRUDViewModel = _AssetAssignedCRUDViewModel;
                return vm;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet]
        public async Task<IActionResult> AddEdit(int id)
        {
            try
            {
                AssetCRUDViewModel vm = new();
                ViewBag._LoadddlAssetCategorie = new SelectList(_iCommon.LoadddlAssetCategorie(), "Id", "Name");
                ViewBag._LoadddlAssetSubCategorie = new SelectList(_iCommon.LoadddlAssetSubCategorie(), "Id", "Name");
                ViewBag._LoadddlDepartment = new SelectList(_iCommon.LoadddlDepartment(), "Id", "Name");
                ViewBag._LoadddlSubDepartment = new SelectList(_iCommon.LoadddlSubDepartment(), "Id", "Name");

                //ViewBag._LoadddlEmployee = new SelectList(_iCommon.LoadddlEmployee(), "Id", "Name");
                ViewBag._LoadddlSupplier = new SelectList(_iCommon.LoadddlSupplier(), "Id", "Name");
                ViewBag._LoadddlAssetStatus = new SelectList(_iCommon.LoadddlAssetStatus(), "Id", "Name");

                if (id > 0)
                {
                    vm = await _context.Asset.Where(x => x.Id == id).SingleOrDefaultAsync();
                    vm.listCommentCRUDViewModel = await _iCommon.GetCommentList(id).ToListAsync();
                    return PartialView("_Edit", vm);
                }
                else
                {
                    vm.AssetId = "AST-" + StaticData.RandomDigits(6);
                    vm.QRCode = vm.AssetId;
                    return PartialView("_Add", vm);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddEdit(AssetCRUDViewModel vm)
        {
            JsonResultViewModel _JsonResultViewModel = new();
            string _UserName = HttpContext.User.Identity.Name;
            try
            {
                Asset _Asset = new();
                if (vm.Id > 0)
                {
                    _Asset = await _context.Asset.FindAsync(vm.Id);
                    if (vm.ImageURLDetails == null)
                    {
                        vm.ImageURL = _Asset.ImageURL;
                    }
                    else
                    {
                        vm.ImageURL = "/upload/" + _iCommon.UploadedFile(vm.ImageURLDetails);
                    }
                    if (vm.PurchaseReceiptDetails == null)
                    {
                        vm.PurchaseReceipt = _Asset.PurchaseReceipt;
                    }
                    else
                    {
                        vm.PurchaseReceipt = "/upload/" + _iCommon.UploadedFile(vm.PurchaseReceiptDetails);
                    }

                    vm.UserName = _UserName;
                    //var _AssetAllocationUpdate = await AssetAllocationUpdate(vm, _Asset);

                    vm.CreatedDate = _Asset.CreatedDate;
                    vm.CreatedBy = _Asset.CreatedBy;
                    vm.ModifiedDate = DateTime.Now;
                    vm.ModifiedBy = _UserName;
                    _context.Entry(_Asset).CurrentValues.SetValues(vm);
                    await _context.SaveChangesAsync();

                    await _iAssetService.AddAssetHistory(_Asset.Id, _Asset.AssignEmployeeId, "Asset Updated.", _UserName);

                    _JsonResultViewModel.AlertMessage = "Asset Updated Successfully. ID: " + _Asset.Id;
                    _JsonResultViewModel.IsSuccess = true;
                    return new JsonResult(_JsonResultViewModel);
                }
                else
                {
                    _Asset = vm;
                    var _ImageURL = _iCommon.UploadedFile(vm.ImageURLDetails);
                    _ImageURL = _ImageURL != null ? _ImageURL : "blank-asset.png";
                    _Asset.ImageURL = "/upload/" + _ImageURL;

                    var _PurchaseReceipt = _iCommon.UploadedFile(vm.PurchaseReceiptDetails);
                    if (_PurchaseReceipt != null)
                    {
                        _Asset.PurchaseReceipt = "/upload/" + _PurchaseReceipt;
                    }
                    else
                    {
                        _Asset.PurchaseReceipt = "";
                    }

                    _Asset.CreatedDate = DateTime.Now;
                    _Asset.ModifiedDate = DateTime.Now;
                    _Asset.CreatedBy = _UserName;
                    _Asset.ModifiedBy = _UserName;
                    _context.Add(_Asset);
                    await _context.SaveChangesAsync();

                    await _iAssetService.AddAssetHistory(_Asset.Id, _Asset.AssignEmployeeId, "Asset Created.", _UserName);

                    _JsonResultViewModel.AlertMessage = "Asset Created Successfully. ID: " + _Asset.Id;
                    _JsonResultViewModel.CurrentURL = vm.CurrentURL;
                    _JsonResultViewModel.IsSuccess = true;
                    return new JsonResult(_JsonResultViewModel);
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _JsonResultViewModel.IsSuccess = false;
                _JsonResultViewModel.AlertMessage = ex.Message;
                return new JsonResult(_JsonResultViewModel);
                throw;
            }
        }

        private async Task<int> AssetAllocationUpdate(AssetCRUDViewModel vm, Asset _Asset)
        {
            int _AssetStatusValue = vm.AssetStatus;
            string _UserName = vm.UserName;
            if (_Asset.AssignEmployeeId != vm.AssignEmployeeId)
            {
                if (_Asset.AssignEmployeeId == 0)
                {
                    AssetAssigned _AssetAssigned = new();
                    _AssetAssigned.AssetId = vm.Id;
                    _AssetAssigned.EmployeeId = vm.AssignEmployeeId;
                    _AssetAssigned.Status = AssetAssignedStatus.Assigned;
                    await _iAssetService.AddAssetAssigned(_AssetAssigned, _UserName);

                    await _iAssetService.AddAssetHistory(_Asset.Id, vm.AssignEmployeeId, "Unassigned Asset Assigned to Employee.", _UserName);
                    _AssetStatusValue = AssetStatusValue.InUse;
                }
                else
                {
                    if (vm.AssignEmployeeId == 0)
                    {
                        //Remove Assignee
                        var _AssetAssigned = await _context.AssetAssigned.Where(x => x.AssetId == vm.Id && x.Status == "Assigned").SingleOrDefaultAsync();
                        var result = await _iAssetService.RemoveAssetAssigned(_AssetAssigned.Id, _UserName);
                        await _iAssetService.AddAssetHistory(_Asset.Id, _Asset.AssignEmployeeId, "Asset Unassigned from Employee.", _UserName);
                        _AssetStatusValue = AssetStatusValue.Available;
                    }
                    else
                    {
                        //Remove Assignee
                        var _AssetAssigned = await _context.AssetAssigned.Where(x => x.AssetId == vm.Id && x.Status == "Assigned").SingleOrDefaultAsync();
                        var result = await _iAssetService.RemoveAssetAssigned(_AssetAssigned.Id, _UserName);
                        await _iAssetService.AddAssetHistory(_Asset.Id, _Asset.AssignEmployeeId, "Asset Unassigned from Employee.", _UserName);

                        //Add New Assignee
                        _AssetAssigned = new();
                        _AssetAssigned.AssetId = vm.Id;
                        _AssetAssigned.EmployeeId = vm.AssignEmployeeId;
                        _AssetAssigned.Status = AssetAssignedStatus.Assigned;
                        await _iAssetService.AddAssetAssigned(_AssetAssigned, _UserName);

                        await _iAssetService.AddAssetHistory(_Asset.Id, vm.AssignEmployeeId, "Asset Assigned to Employee.", _UserName);
                        _AssetStatusValue = AssetStatusValue.InUse;
                    }
                }
            }
            else
            {
                await _iAssetService.AddAssetHistory(_Asset.Id, vm.AssignEmployeeId, "Asset Updated.", _UserName);
                _AssetStatusValue = vm.AssetStatus;
            }
            return _AssetStatusValue;
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Int64 id)
        {
            try
            {
                string _UserName = HttpContext.User.Identity.Name;
                var _Asset = await _context.Asset.FindAsync(id);
                _Asset.ModifiedDate = DateTime.Now;
                _Asset.ModifiedBy = _UserName;
                _Asset.Cancelled = true;
                _context.Update(_Asset);
                await _context.SaveChangesAsync();

                await _iAssetService.AddAssetHistory(_Asset.Id, _Asset.AssignEmployeeId, "Asset Deleted.", _UserName);
                return new JsonResult(_Asset);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet]
        public JsonResult DownloadPurchaseReceipt(Int64 id)
        {
            try
            {
                var _GetDownloadDetails = _iCommon.GetDownloadDetails(id);
                return new JsonResult(_GetDownloadDetails);
            }
            catch (Exception) { throw; }
        }
        [HttpGet]
        public async Task<IActionResult> AllocateAsset(int id)
        {
            try
            {
                AssetAssignedCRUDViewModel vm = new();
                vm.AssetId = id;
                vm.listAssetAssignedCRUDViewModel = await _iCommon.GetAssetAssignedByAsetId(id).ToListAsync();
                //ViewBag.ddlAsset = new SelectList(_iCommon.GetTableData<Asset>(_context).Where(x => x.AssetStatus != AssetStatusValue.InUse).OrderByDescending(x => x.Id), "Id", "Name");
                ViewBag.LoadddlEmployee = new SelectList(_iCommon.LoadddlEmployee(), "Id", "Name");
                return PartialView("_AllocateAssetAdd", vm);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public async Task<JsonResult> AllocateAssetSave(AssetAssigned vm)
        {
            try
            {
                var _IsAlreadyAllocate = await IsAlreadyAllocate(vm.AssetId, vm.EmployeeId);
                if (_IsAlreadyAllocate)
                {
                    return new JsonResult(_IsAlreadyAllocate);
                }

                string _UserName = HttpContext.User.Identity.Name;
                vm.Status = AssetAssignedStatus.Assigned;
                await _iAssetService.AddAssetAssigned(vm, _UserName);

                //Update Asset:
                var _Asset = await _context.Asset.FindAsync(vm.AssetId);
                AssetCRUDViewModel _AssetCRUDViewModel = _Asset;
                _AssetCRUDViewModel.AssignEmployeeId = vm.EmployeeId;
                _AssetCRUDViewModel.AssetStatus = AssetStatusValue.InUse;
                _AssetCRUDViewModel.ModifiedDate = DateTime.Now;
                _AssetCRUDViewModel.ModifiedBy = _UserName;
                _context.Entry(_Asset).CurrentValues.SetValues(_AssetCRUDViewModel);
                await _context.SaveChangesAsync();

                await _iAssetService.AddAssetHistory(vm.AssetId, vm.EmployeeId, "Asset Assigned.", _UserName);

                var result = await _iCommon.GetAssetAssignedByAsetId(vm.AssetId).ToListAsync();
                return new JsonResult(result);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return new JsonResult(ex.Message);
                throw;
            }
        }
        [HttpDelete]
        public async Task<IActionResult> RemoveAllocateAsset(Int64 id)
        {
            try
            {
                string _UserName = HttpContext.User.Identity.Name;
                var _AssetAssigned = await _iAssetService.RemoveAssetAssigned(id, _UserName);

                //Update Asset:
                var _Asset = await _context.Asset.FindAsync(_AssetAssigned.AssetId);
                AssetCRUDViewModel _AssetCRUDViewModel = _Asset;
                _AssetCRUDViewModel.AssignEmployeeId = 0;
                _AssetCRUDViewModel.AssetStatus = AssetStatusValue.Available;
                _AssetCRUDViewModel.ModifiedDate = DateTime.Now;
                _AssetCRUDViewModel.ModifiedBy = _UserName;
                _context.Entry(_Asset).CurrentValues.SetValues(_AssetCRUDViewModel);
                await _context.SaveChangesAsync();

                await _iAssetService.AddAssetHistory(_AssetAssigned.AssetId, _AssetAssigned.EmployeeId, "Asset UnAssigned.", _UserName);
                return new JsonResult(_AssetAssigned);
            }
            catch (Exception)
            {
                throw;
            }
        }
        private async Task<bool> IsAlreadyAllocate(Int64 _AssetId, Int64 _EmployeeId)
        {
            try
            {
                var listAssetAssigned = await _context.AssetAssigned.Where(x => x.AssetId == _AssetId && x.EmployeeId == _EmployeeId && x.Cancelled == false).ToListAsync();
                if (listAssetAssigned.Count() > 0)
                    return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        private async Task<Int64> GetLoginEmployeeId()
        {
            Int64 _UserProfileId = 0;
            var _UserEmail = HttpContext.User.Identity.Name;
            var _ApplicationUser = await _context.ApplicationUser.Where(x => x.Email == _UserEmail).SingleOrDefaultAsync();
            if (_ApplicationUser != null)
            {
                _UserProfileId = _context.UserProfile.Where(x => x.ApplicationUserId == _ApplicationUser.Id).SingleOrDefault().UserProfileId;
            }
            return _UserProfileId;
        }
    }
}
