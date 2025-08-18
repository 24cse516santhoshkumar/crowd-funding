package com.example.Backend.service;

import com.example.Backend.entity.Wallet;
import com.example.Backend.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    public Wallet createWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    public Page<Wallet> getAllWallets(int page, int size, String sortBy) {
        return walletRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    public Optional<Wallet> getWalletById(Long id) {
        return walletRepository.findById(id);
    }

    public Wallet updateWallet(Long id, Wallet updated) {
        return walletRepository.findById(id).map(wallet -> {
            wallet.setBalance(updated.getBalance());
            return walletRepository.save(wallet);
        }).orElseThrow(() -> new RuntimeException("Wallet not found"));
    }

    public void deleteWallet(Long id) {
        walletRepository.deleteById(id);
    }
}
