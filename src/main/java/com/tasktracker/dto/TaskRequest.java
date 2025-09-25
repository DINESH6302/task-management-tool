package com.tasktracker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

public class TaskRequest {
    
    @NotBlank(message = "Task name is required")
    @Size(min = 3, max = 100, message = "Task name must be between 3 and 100 characters")
    private String name;
    
    @NotNull(message = "Branches are required")
    @Size(min = 1, message = "At least one branch is required")
    private List<BranchInfo> branches;
    
    private List<String> mergeRequestLinks;
    
    @NotBlank(message = "Release version is required")
    @Pattern(regexp = "^v\\d+\\.\\d+\\.\\d+$", message = "Release version must follow format: v1.0.0")
    private String releaseVersion;
    
    @NotBlank(message = "Status is required")
    @Pattern(regexp = "^(Upcoming|Ongoing|Completed)$", message = "Status must be one of: Upcoming, Ongoing, Completed")
    private String status;

    // Constructors
    public TaskRequest() {}

    public TaskRequest(String name, List<BranchInfo> branches, List<String> mergeRequestLinks, 
                      String releaseVersion, String status) {
        this.name = name;
        this.branches = branches;
        this.mergeRequestLinks = mergeRequestLinks;
        this.releaseVersion = releaseVersion;
        this.status = status;
    }

    // Getters and Setters
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

    // Inner class for branch information
    public static class BranchInfo {
        @NotBlank(message = "Repository name is required")
        private String repo;
        
        @NotBlank(message = "Branch name is required")
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