package com.tasktracker.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TaskResponse {
    
    private String id;
    private String name;
    private List<BranchInfo> branches;
    private List<String> mergeRequestLinks;
    private String releaseVersion;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public TaskResponse() {}

    public TaskResponse(String id, String name, List<BranchInfo> branches, List<String> mergeRequestLinks,
                       String releaseVersion, String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.branches = branches;
        this.mergeRequestLinks = mergeRequestLinks;
        this.releaseVersion = releaseVersion;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BranchInfo> getBranches() {
        return branches;
    }

    public void setBranches(List<BranchInfo> branches) {
        this.branches = branches;
    }

    public List<String> getMergeRequestLinks() {
        return mergeRequestLinks;
    }

    public void setMergeRequestLinks(List<String> mergeRequestLinks) {
        this.mergeRequestLinks = mergeRequestLinks;
    }

    public String getReleaseVersion() {
        return releaseVersion;
    }

    public void setReleaseVersion(String releaseVersion) {
        this.releaseVersion = releaseVersion;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Inner class for branch information
    public static class BranchInfo {
        private String repo;
        private String branchName;

        public BranchInfo() {}

        public BranchInfo(String repo, String branchName) {
            this.repo = repo;
            this.branchName = branchName;
        }

        public String getRepo() {
            return repo;
        }

        public void setRepo(String repo) {
            this.repo = repo;
        }

        public String getBranchName() {
            return branchName;
        }

        public void setBranchName(String branchName) {
            this.branchName = branchName;
        }
    }
}