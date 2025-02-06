using AMS.Data;
using AMS.Models;
using AMS.Models.AssetHistoryViewModel;

namespace AMS.Services
{
    public class AssetService : IAssetService
    {
        private readonly ApplicationDbContext _context;
        public AssetService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddAssetHistory(Int64 _AssetId, Int64 _AssignEmployeeId, string _Action, string _UserName)
        {
            AssetHistoryCRUDViewModel vm = new()
            {
                AssetId = _AssetId,
                AssignEmployeeId = _AssignEmployeeId,
                Action = _Action,
                UserName = _UserName
            };

            AssetHistory _AssetHistory = new();
            _AssetHistory = vm;
            _AssetHistory.CreatedDate = DateTime.Now;
            _AssetHistory.ModifiedDate = DateTime.Now;
            _AssetHistory.CreatedBy = vm.UserName;
            _AssetHistory.ModifiedBy = vm.UserName;
            _context.Add(_AssetHistory);
            await _context.SaveChangesAsync();
        }
        public async Task<AssetAssigned> AddAssetAssigned(AssetAssigned _AssetAssigned, string _UserName)
        {
            try
            {
                _AssetAssigned.CreatedDate = DateTime.Now;
                _AssetAssigned.ModifiedDate = DateTime.Now;
                _AssetAssigned.CreatedBy = _UserName;
                _AssetAssigned.ModifiedBy = _UserName;
                _context.Add(_AssetAssigned);
                await _context.SaveChangesAsync();
                return _AssetAssigned;
            }
            catch (Exception) { throw; }
        }
        public async Task<AssetAssigned> RemoveAssetAssigned(Int64 id, string _UserName)
        {
            try
            {
                var _AssetAssigned = await _context.AssetAssigned.FindAsync(id);
                _AssetAssigned.ModifiedDate = DateTime.Now;
                _AssetAssigned.ModifiedBy = _UserName;
                _AssetAssigned.Status = "UnAssigned";
                _AssetAssigned.Cancelled = true;
                _context.Update(_AssetAssigned);
                await _context.SaveChangesAsync();
                return _AssetAssigned;
            }
            catch (Exception) { throw; }
        }
    }
}
