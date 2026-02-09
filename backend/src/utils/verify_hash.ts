import { calculateHash } from './hash';

const testDeduplication = () => {
    console.log('🧪 Testing File Deduplication Logic...');

    // 1. Simulate two identical files
    const fileContent1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const fileContent2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

    // 2. Simulate a different file
    const fileContent3 = "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    // 3. Calculate hashes
    const hash1 = calculateHash(fileContent1);
    const hash2 = calculateHash(fileContent2);
    const hash3 = calculateHash(fileContent3);

    console.log(`\nFile 1 Hash: ${hash1}`);
    console.log(`File 2 Hash: ${hash2}`);
    console.log(`File 3 Hash: ${hash3}`);

    // 4. Verify Matches
    if (hash1 === hash2) {
        console.log('✅ PASS: Identical files hav identical hashes.');
    } else {
        console.error('❌ FAIL: Identical files have DIFFERENT hashes.');
    }

    if (hash1 !== hash3) {
        console.log('✅ PASS: Different files have different hashes.');
    } else {
        console.error('❌ FAIL: Different files have IDENTICAL hashes (Collision!).');
    }
};

testDeduplication();
