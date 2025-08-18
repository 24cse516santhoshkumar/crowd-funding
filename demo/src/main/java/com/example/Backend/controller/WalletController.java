package com.example.Backend.controller;

import com.example.Backend.entity.Wallet;
import com.example.Backend.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallets")
@CrossOrigin
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping
    public Wallet create(@RequestBody Wallet wallet) {
        return walletService.createWallet(wallet);
    }

    @GetMapping
    public Page<Wallet> getAll(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size,
                               @RequestParam(defaultValue = "id") String sortBy) {
        return walletService.getAllWallets(page, size, sortBy);
    }

    @GetMapping("/{id}")
    public Wallet getById(@PathVariable Long id) {
        return walletService.getWalletById(id)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));
    }

    @PutMapping("/{id}")
    public Wallet update(@PathVariable Long id, @RequestBody Wallet wallet) {
        return walletService.updateWallet(id, wallet);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        walletService.deleteWallet(id);
    }
}
