// 将运行在每个测试文件之前

// mock uni对象
vi.stubGlobal('uni', { getSystemInfoSync: vi.fn() })
