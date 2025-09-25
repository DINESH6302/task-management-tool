import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, Edit3, Trash2, GitBranch, ExternalLink, Tag, Bookmark, User, FileText, FileCheck, Video, HelpCircle, Settings, Users, ShoppingCart, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  name: string;
  branches: { repo: string; branchName: string }[];
  mergeRequestLinks: string[];
  releaseVersion: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

interface BookmarkItem {
  id: string;
  name: string;
  url: string;
  category: 'Document' | 'Form' | 'Video' | 'FAQ' | 'Tool' | 'Social' | 'Shopping' | 'News';
}

const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Implement User Authentication System',
    branches: [
      { repo: 'frontend-repo', branchName: 'feature/user-auth' },
      { repo: 'backend-repo', branchName: 'feature/auth-api' }
    ],
    mergeRequestLinks: ['https://github.com/project/repo/pull/123', 'https://github.com/project/repo/pull/124'],
    releaseVersion: 'v2.1.0',
    status: 'Completed'
  },
  {
    id: '2',
    name: 'Add Payment Gateway Integration',
    branches: [
      { repo: 'frontend-repo', branchName: 'feature/payment-gateway' }
    ],
    mergeRequestLinks: ['https://github.com/project/repo/pull/125'],
    releaseVersion: 'v2.2.0',
    status: 'Ongoing'
  },
  {
    id: '3',
    name: 'Implement Dark Mode Theme',
    branches: [
      { repo: 'frontend-repo', branchName: 'feature/dark-mode' },
      { repo: 'mobile-app', branchName: 'feature/dark-theme' }
    ],
    mergeRequestLinks: [],
    releaseVersion: 'v2.3.0',
    status: 'Upcoming'
  },
  {
    id: '4',
    name: 'Optimize Database Performance',
    branches: [
      { repo: 'backend-repo', branchName: 'performance/db-optimization' }
    ],
    mergeRequestLinks: ['https://github.com/project/repo/pull/126', 'https://github.com/project/repo/pull/127'],
    releaseVersion: 'v2.1.1',
    status: 'Completed'
  }
];

const initialBookmarks: BookmarkItem[] = [
  {
    id: '1',
    name: 'React Documentation',
    url: 'https://react.dev',
    category: 'Document'
  },
  {
    id: '2',
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    category: 'Tool'
  },
  {
    id: '3',
    name: 'GitHub Repository',
    url: 'https://github.com/username/project',
    category: 'Tool'
  },
  {
    id: '4',
    name: 'Figma Design',
    url: 'https://figma.com/design/project',
    category: 'Tool'
  }
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(initialBookmarks);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingBookmark, setEditingBookmark] = useState<BookmarkItem | null>(null);
  const [taskFormData, setTaskFormData] = useState({
    name: '',
    branches: [{ repo: '', branchName: '' }],
    mergeRequestLinks: '',
    releaseVersion: '',
    status: 'Upcoming' as Task['status']
  });
  const [bookmarkFormData, setBookmarkFormData] = useState({
    name: '',
    url: '',
    category: 'Document' as BookmarkItem['category']
  });

  const availableRepos = [
    'frontend-repo',
    'backend-repo',
    'mobile-app',
    'api-service',
    'database-repo',
    'shared-components'
  ];
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-500 hover:bg-green-600';
      case 'Ongoing': return 'bg-orange-500 hover:bg-orange-600';
      case 'Upcoming': return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const getCategoryIcon = (category: BookmarkItem['category']) => {
    switch (category) {
      case 'Document': return FileText;
      case 'Form': return FileCheck;
      case 'Video': return Video;
      case 'FAQ': return HelpCircle;
      case 'Tool': return Settings;
      case 'Social': return Users;
      case 'Shopping': return ShoppingCart;
      case 'News': return Newspaper;
      default: return Bookmark;
    }
  };

  const getCategoryColor = (category: BookmarkItem['category']) => {
    switch (category) {
      case 'Document': return 'from-blue-500 to-blue-600';
      case 'Form': return 'from-green-500 to-green-600';
      case 'Video': return 'from-red-500 to-red-600';
      case 'FAQ': return 'from-yellow-500 to-yellow-600';
      case 'Tool': return 'from-purple-500 to-purple-600';
      case 'Social': return 'from-pink-500 to-pink-600';
      case 'Shopping': return 'from-orange-500 to-orange-600';
      case 'News': return 'from-gray-500 to-gray-600';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const toggleExpanded = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const openTaskModal = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setTaskFormData({
        name: task.name,
        branches: task.branches.length > 0 ? task.branches : [{ repo: '', branchName: '' }],
        mergeRequestLinks: task.mergeRequestLinks.join('\n'),
        releaseVersion: task.releaseVersion,
        status: task.status
      });
    } else {
      setEditingTask(null);
      setTaskFormData({
        name: '',
        branches: [{ repo: '', branchName: '' }],
        mergeRequestLinks: '',
        releaseVersion: '',
        status: 'Upcoming'
      });
    }
    setIsTaskModalOpen(true);
  };

  const openBookmarkModal = (bookmark?: BookmarkItem) => {
    if (bookmark) {
      setEditingBookmark(bookmark);
      setBookmarkFormData({
        name: bookmark.name,
        url: bookmark.url,
        category: bookmark.category
      });
    } else {
      setEditingBookmark(null);
      setBookmarkFormData({
        name: '',
        url: '',
        category: 'Document'
      });
    }
    setIsBookmarkModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const closeBookmarkModal = () => {
    setIsBookmarkModalOpen(false);
    setEditingBookmark(null);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Task = {
      id: editingTask?.id || Date.now().toString(),
      name: taskFormData.name,
      branches: taskFormData.branches.filter(branch => branch.repo && branch.branchName),
      mergeRequestLinks: taskFormData.mergeRequestLinks.split('\n').filter(link => link.trim()),
      releaseVersion: taskFormData.releaseVersion,
      status: taskFormData.status
    };

    if (editingTask) {
      setTasks(tasks.map(task => task.id === editingTask.id ? taskData : task));
    } else {
      setTasks([...tasks, taskData]);
    }

    closeTaskModal();
  };

  const handleBookmarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookmarkData: BookmarkItem = {
      id: editingBookmark?.id || Date.now().toString(),
      name: bookmarkFormData.name,
      url: bookmarkFormData.url,
      category: bookmarkFormData.category
    };

    if (editingBookmark) {
      setBookmarks(bookmarks.map(bookmark => bookmark.id === editingBookmark.id ? bookmarkData : bookmark));
    } else {
      setBookmarks([...bookmarks, bookmarkData]);
    }

    closeBookmarkModal();
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
  };

  const confirmDeleteBookmark = (bookmarkId: string) => {
    setBookmarkToDelete(bookmarkId);
    setDeleteConfirmOpen(true);
  };

  const deleteBookmark = () => {
    if (bookmarkToDelete) {
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkToDelete));
      setBookmarkToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  const cancelDelete = () => {
    setBookmarkToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const addBranch = () => {
    setTaskFormData({
      ...taskFormData,
      branches: [...taskFormData.branches, { repo: '', branchName: '' }]
    });
  };

  const removeBranch = (index: number) => {
    if (taskFormData.branches.length > 1) {
      setTaskFormData({
        ...taskFormData,
        branches: taskFormData.branches.filter((_, i) => i !== index)
      });
    }
  };

  const updateBranch = (index: number, field: 'repo' | 'branchName', value: string) => {
    const updatedBranches = taskFormData.branches.map((branch, i) => 
      i === index ? { ...branch, [field]: value } : branch
    );
    setTaskFormData({
      ...taskFormData,
      branches: updatedBranches
    });
  };
  return (
    <Tabs defaultValue="tasks" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Task Tracker
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Bookmarks
            </TabsTrigger>
          </TabsList>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Tasks</h2>
                <p className="text-gray-600 mt-1">Manage your development tasks and track progress</p>
              </div>
              <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => openTaskModal()} size="lg" className="shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
                    <DialogDescription>
                      {editingTask ? 'Update the task details below.' : 'Fill in the details for your new task.'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleTaskSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="taskName">Task Name *</Label>
                        <Input
                          id="taskName"
                          required
                          value={taskFormData.name}
                          onChange={(e) => setTaskFormData({ ...taskFormData, name: e.target.value })}
                          placeholder="Enter task name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branchName">Branch Name *</Label>
                        <Input
                          id="branchName"
                          required
                          value={taskFormData.branchName}
                          onChange={(e) => setTaskFormData({ ...taskFormData, branchName: e.target.value })}
                          placeholder="e.g., feature/new-feature"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="releaseVersion">Release Version *</Label>
                        <Input
                          id="releaseVersion"
                          required
                          value={taskFormData.releaseVersion}
                          onChange={(e) => setTaskFormData({ ...taskFormData, releaseVersion: e.target.value })}
                          placeholder="e.g., v1.0.0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status *</Label>
                        <Select value={taskFormData.status} onValueChange={(value: Task['status']) => setTaskFormData({ ...taskFormData, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Upcoming">Upcoming</SelectItem>
                            <SelectItem value="Ongoing">Ongoing</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mergeRequestLinks">Merge Request Links</Label>
                      <Textarea
                        id="mergeRequestLinks"
                        value={taskFormData.mergeRequestLinks}
                        onChange={(e) => setTaskFormData({ ...taskFormData, mergeRequestLinks: e.target.value })}
                        placeholder="Enter one link per line"
                        rows={3}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={closeTaskModal}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingTask ? 'Update Task' : 'Save Task'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg border-0 shadow-md">
                  <div
                    className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    onClick={() => toggleExpanded(task.id)}
                  >
                    <div className="flex items-center gap-4">
                      {expandedTasks.has(task.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                    </div>
                    <Badge className={`${getStatusColor(task.status)} text-white border-0`}>
                      {task.status}
                    </Badge>
                  </div>

                  {expandedTasks.has(task.id) && (
                    <div className="px-6 pb-6 border-t bg-gray-50/30">
                      <div className="pt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <GitBranch className="w-5 h-5 text-gray-600" />
                              <div>
                                <span className="text-sm font-medium text-gray-700">Branch:</span>
                                <code className="ml-2 bg-gray-200 px-2 py-1 rounded text-sm font-mono">
                                  {task.branchName}
                                </code>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Tag className="w-5 h-5 text-gray-600" />
                              <div>
                                <span className="text-sm font-medium text-gray-700">Release:</span>
                                <Badge variant="outline" className="ml-2">
                                  {task.releaseVersion}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start gap-3">
                              <ExternalLink className="w-5 h-5 text-gray-600 mt-0.5" />
                              <div className="flex-1">
                                <span className="text-sm font-medium text-gray-700 block mb-2">Merge Requests:</span>
                                {task.mergeRequestLinks.length > 0 ? (
                                  <div className="space-y-1">
                                    {task.mergeRequestLinks.map((link, index) => (
                                      <a
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 underline text-sm block"
                                      >
                                        {link}
                                      </a>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 text-sm">No merge request links</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                          <Button
                            variant="outline" 
                            size="sm"
                            className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              openTaskModal(task);
                            }}
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Task
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTask(task.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {tasks.length === 0 && (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <Tag className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">No tasks yet</h3>
                    <p className="text-gray-600">Add your first task to get started tracking your development work!</p>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Bookmarks</h2>
                <p className="text-gray-600 mt-1">Save and organize your important links</p>
              </div>
              <Dialog open={isBookmarkModalOpen} onOpenChange={setIsBookmarkModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => openBookmarkModal()} size="lg" className="shadow-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Bookmark
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{editingBookmark ? 'Edit Bookmark' : 'Add New Bookmark'}</DialogTitle>
                    <DialogDescription>
                      {editingBookmark ? 'Update the bookmark details below.' : 'Add a new bookmark to your collection.'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleBookmarkSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bookmarkName">Bookmark Name *</Label>
                      <Input
                        id="bookmarkName"
                        required
                        value={bookmarkFormData.name}
                        onChange={(e) => setBookmarkFormData({ ...bookmarkFormData, name: e.target.value })}
                        placeholder="Enter bookmark name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bookmarkUrl">URL *</Label>
                      <Input
                        id="bookmarkUrl"
                        type="url"
                        required
                        value={bookmarkFormData.url}
                        onChange={(e) => setBookmarkFormData({ ...bookmarkFormData, url: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bookmarkCategory">Category *</Label>
                      <Select value={bookmarkFormData.category} onValueChange={(value: BookmarkItem['category']) => setBookmarkFormData({ ...bookmarkFormData, category: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Document">📄 Document</SelectItem>
                          <SelectItem value="Form">📋 Form</SelectItem>
                          <SelectItem value="Video">🎥 Video</SelectItem>
                          <SelectItem value="FAQ">❓ FAQ</SelectItem>
                          <SelectItem value="Tool">🔧 Tool</SelectItem>
                          <SelectItem value="Social">👥 Social</SelectItem>
                          <SelectItem value="Shopping">🛒 Shopping</SelectItem>
                          <SelectItem value="News">📰 News</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={closeBookmarkModal}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingBookmark ? 'Update Bookmark' : 'Save Bookmark'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Bookmarks Grid */}
            <div className="space-y-3">
              {bookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(bookmark.category)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          {React.createElement(getCategoryIcon(bookmark.category), { className: "w-5 h-5 text-white" })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{bookmark.name}</h3>
                          <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 underline truncate block"
                          >
                            {bookmark.url}
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="icon"
                          className="h-8 w-8 border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 bg-white"
                          onClick={() => openBookmarkModal(bookmark)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          className="h-8 w-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
                          onClick={() => confirmDeleteBookmark(bookmark.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Delete Bookmark</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this bookmark? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={cancelDelete}>
                    Cancel
                  </Button>
                  <Button type="button" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0" onClick={deleteBookmark}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {bookmarks.length === 0 && (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <Bookmark className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">No bookmarks yet</h3>
                    <p className="text-gray-600">Add your first bookmark to start organizing your important links!</p>
                    </div>
                </div>
              </Card>
            )}
          </TabsContent>
      </main>
    </Tabs>
  );
}

export default App;