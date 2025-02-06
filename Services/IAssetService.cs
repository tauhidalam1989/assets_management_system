using AMS.Models;

namespace AMS.Services
{
    public interface IAssetService
    {
        Task AddAssetHistory(Int64 _AssetId, Int64 _AssignEmployeeId, string _Action, string _UserName);
        Task<AssetAssigned> AddAssetAssigned(AssetAssigned _AssetAssigned, string _UserName);
        Task<AssetAssigned> RemoveAssetAssigned(Int64 id, string _UserName);
    }
}
